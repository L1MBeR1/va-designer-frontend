import { ISendMail } from '@/types/mail.types'

import { axiosClassic } from '@/api/interceptors'

class MailService {
	private BASE_URL = '/mail'

	async sendPasswordResetMail(data: ISendMail) {
		const response = await axiosClassic.post(
			`${this.BASE_URL}/password-reset`,
			data
		)
		return response
	}
}

export const mailService = new MailService()
