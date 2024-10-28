import Github from '/public/svgs/githubLogo.svg'
import { Button } from '@nextui-org/react'

import { EnumAuthProviders, EnumAuthType } from '@/types/auth.types'

import { generateState } from '@/utils/auth/generateState'

interface IGithubButtonProps {
	label: string
	purpose: EnumAuthType
}

export const GithubButton = ({ label, purpose }: IGithubButtonProps) => {
	const handleLoginGitHub = () => {
		const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
		const state = generateState(128)

		localStorage.setItem('oauth_state', state)
		localStorage.setItem('oauth_purpose', purpose)

		const redirectUri = encodeURIComponent(
			`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback?provider=${EnumAuthProviders.github}`
		)

		const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&state=${state}&redirect_uri=${redirectUri}`
		window.location.href = githubAuthUrl
	}

	return (
		<Button
			onClick={handleLoginGitHub}
			startContent={
				<Github
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
