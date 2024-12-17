import { ITokenVerify } from '@/types/token.types'

import { axiosClassic } from '@/api/interceptors'

class TokenService {
	private BASE_URL = '/token/verify'

	async verify(data: ITokenVerify) {
		const response = await axiosClassic.post(`${this.BASE_URL}`, data)
		return response
	}
}

export const tokenService = new TokenService()
