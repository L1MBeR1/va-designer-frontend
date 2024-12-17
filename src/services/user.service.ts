import { IUser } from '@/types/auth.types'
import { IEmailVerify, IPasswordChangeForm } from '@/types/user.types'

import { axiosClassic, axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL = '/user'

	async getProfile() {
		try {
			const response = await axiosWithAuth.get<IUser>(
				`${this.BASE_URL}/profile`
			)
			return response.data || null
		} catch {
			return null
		}
	}

	async verifyEmail(data: IEmailVerify) {
		const response = await axiosClassic.post(`${this.BASE_URL}/email`, data)
		return response
	}

	async changePassword(data: IPasswordChangeForm) {
		const response = await axiosClassic.put(
			`${this.BASE_URL}/update/password`,
			data
		)
		return response
	}
}

export const userService = new UserService()
