export interface ITokenVerify {
	token: string
	purpose: TokenPurpose
}

export enum TokenPurpose {
	EMAIL_VERIFICATION = 'EMAIL_VERIFICATION',
	PASSWORD_RESET = 'PASSWORD_RESET',
	EMAIL_CHANGE = 'EMAIL_CHANGE',
	ACCOUNT_DELETION = 'ACCOUNT_DELETION'
}

export enum VerifyFormStates {
	SUCCESS,
	EXPIRED
}
