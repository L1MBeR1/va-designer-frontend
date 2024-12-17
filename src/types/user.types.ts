export interface IEmailVerify {
	token: string
}

export interface IPasswordChangeForm {
	token: string
	password: string
	confirmPassword: string
}

export interface IRecoveryForm {
	email: string
}
