export const generateCodeVerifier = (): string => {
	return Array.from(crypto.getRandomValues(new Uint8Array(32)))
		.map(v => v.toString(16).padStart(2, '0'))
		.join('')
}

export const generateCodeChallenge = async (
	codeVerifier: string
): Promise<string> => {
	const encoder = new TextEncoder()
	const data = encoder.encode(codeVerifier)
	const digest = await crypto.subtle.digest('SHA-256', data)

	return btoa(String.fromCharCode(...Array.from(new Uint8Array(digest))))
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '')
}
