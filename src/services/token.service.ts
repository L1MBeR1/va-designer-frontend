import { ITokenVerify } from '@/types/token.types'

import { axiosClassic } from '@/api/interceptors'

class TokenService {
	private BASE_URL = '/token/verify'

	async verifyEmail(data: ITokenVerify) {
		const response = await axiosClassic.post(`${this.BASE_URL}/email`, data)
		return response
	}
}

export const tokenService = new TokenService()
