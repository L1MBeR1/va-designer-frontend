import { IUser } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

class UserService {
	private BASE_URL = '/user/profile'

	async getProfile() {
		try {
			const response = await axiosWithAuth.get<IUser>(this.BASE_URL)
			return response.data || null
		} catch {
			return null
		}
	}
}

export const userService = new UserService()
