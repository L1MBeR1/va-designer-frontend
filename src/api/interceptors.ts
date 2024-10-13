import axios, { type CreateAxiosDefaults } from 'axios'

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

axiosClassic.interceptors.request.use(config => {
	console.log('Classic Request:', config)
	return config
})

axiosClassic.interceptors.response.use(
	response => {
		console.log('Classic Response:', response)
		return response
	},
	error => {
		console.log('Classic Error Response:', error)
		throw error
	}
)

axiosWithAuth.interceptors.request.use(async config => {
	const accessToken = getAccessToken()

	if (!accessToken) {
		console.log('No access token available, attempting to refresh tokens...')
		try {
			await authService.getNewTokens()
			const newAccessToken = getAccessToken()
			if (newAccessToken) {
				config.headers.Authorization = `Bearer ${newAccessToken}`
			}
		} catch (error) {
			console.log('Token refresh failed:', error)
			removeFromStorage()
			throw new Error('Token refresh failed')
		}
	} else {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	console.log('Auth Request:', config)
	return config
})

axiosWithAuth.interceptors.response.use(
	response => {
		console.log('Auth Response:', response)
		return response
	},
	error => {
		const originalRequest = error.config

		console.log('Auth Error Response:', error)

		if (error?.response?.status === 401 && !originalRequest._isRetry) {
			originalRequest._isRetry = true
			console.log(
				'Access token is still invalid, handling error appropriately.'
			)
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
