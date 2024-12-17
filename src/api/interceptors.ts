import axios, { type CreateAxiosDefaults } from 'axios'

import { errorCatch } from './error'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: process.env.NEXT_PUBLIC_BACK_END_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}
const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()
	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	console.log('Request:', {
		url: config.url,
		method: config.method,
		headers: config.headers,
		data: config.data
	})

	return config
})

axiosWithAuth.interceptors.response.use(
	response => {
		console.log('Response:', {
			status: response.status,
			data: response.data,
			headers: response.headers
		})
		return response
	},
	async error => {
		const originalRequest = error.config
		// Лог ошибки
		console.error('Error Response:', {
			status: error?.response?.status,
			data: error?.response?.data,
			message: error.message
		})

		if (
			(error?.response?.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}
		throw error
	}
)

export { axiosClassic, axiosWithAuth }
