import VK from '/public/svgs/vkLogo.svg'
import { Button } from '@nextui-org/react'

import { EnumAuthProviders, EnumAuthType } from '@/types/auth.types'

import { generateState } from '@/utils/auth/generateState'
import {
	generateCodeChallenge,
	generateCodeVerifier
} from '@/utils/auth/pkceUtils'

interface IGithubButtonProps {
	label: string
	purpose: EnumAuthType
}

export const VkButton = ({ label, purpose }: IGithubButtonProps) => {
	const handleLoginGitHub = async () => {
		const clientId = process.env.NEXT_PUBLIC_VK_CLIENT_ID
		const state = generateState(128)

		const codeVerifier = generateCodeVerifier()
		localStorage.setItem('oauth_code_verifier', codeVerifier)
		const codeChallenge = await generateCodeChallenge(codeVerifier)

		localStorage.setItem('oauth_state', state)
		localStorage.setItem('oauth_purpose', purpose)

		const redirectUri = encodeURIComponent(
			`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback?provider=${EnumAuthProviders.vk}`
		)

		const vkAuthUrl = `https://id.vk.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=email`
		window.location.href = vkAuthUrl
	}
	return (
		<Button
			onClick={handleLoginGitHub}
			startContent={
				<VK
					width='25'
					height='25'
				/>
			}
			variant='bordered'
		>
			{label}
		</Button>
	)
}
