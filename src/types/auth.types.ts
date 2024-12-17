export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: number
	name?: string | null
	email?: string | null
	emailVerified?: Date | null
	image?: string | null
	createdAt: Date
	updatedAt: Date
	isTwoFactorEnabled: boolean
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export interface IOAuth {
	code: string | string[]
	provider: string | string[]
	deviceId?: string | string[] | null
	codeVerifier?: string | string[] | null
}

export interface IPKCEResponse {
	codeVerifier: string
	codeChallenge: string
	state: string
}

export enum EnumAuthType {
	login = 'login',
	register = 'register'
}

export enum EnumAuthProviders {
	github = 'github',
	yandex = 'yandex',
	vk = 'vk'
}

export enum OAuthErrorCodes {
	STATE_ERROR = 'state_error',
	NETWORK_ERROR = 'network_error',
	SERVER_ERROR = 'server_error',
	UNKNOWN_ERROR = 'unknown_error',
	SERVICE_ERROR = 'service_error',
	ACCESS_DENIED = 'access_denied'
}

export const OAuthErrorMessages: Record<OAuthErrorCodes, string> = {
	[OAuthErrorCodes.STATE_ERROR]:
		'Ошибка верификации состояния. Попробуйте снова.',
	[OAuthErrorCodes.NETWORK_ERROR]:
		'Ошибка сети. Пожалуйста, проверьте подключение к интернету.',
	[OAuthErrorCodes.SERVER_ERROR]: 'Серверная ошибка. Повторите попытку позже.',
	[OAuthErrorCodes.UNKNOWN_ERROR]:
		'Неизвестная ошибка. Свяжитесь с поддержкой.',
	[OAuthErrorCodes.SERVICE_ERROR]:
		'Ошибка авторизации. Попробуйте другой способ входа.',
	[OAuthErrorCodes.ACCESS_DENIED]:
		'Доступ запрещен. Вы отказались от авторизации.'
}
