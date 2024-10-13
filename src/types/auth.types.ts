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
