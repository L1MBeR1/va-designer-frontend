import Github from '/public/svgs/githubLogo.svg'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'

import { EnumAuthProviders, EnumAuthType } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

interface IGithubButtonProps {
	label: string
	purpose: EnumAuthType
	setLoading: (isLoading: boolean) => void
}

export const GithubButton = ({
	label,
	purpose,
	setLoading
}: IGithubButtonProps) => {
	const { mutate } = useMutation({
		mutationKey: ['pkce'],
		mutationFn: () => authService.pkce(),
		onMutate() {
			setLoading(true)
		},
		onSuccess(response) {
			const { state } = response.data

			sessionStorage.setItem('oauth_state', state)
			sessionStorage.setItem('oauth_purpose', purpose)

			const redirectUri = encodeURIComponent(
				`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback?provider=${EnumAuthProviders.github}`
			)
			const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID

			const url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email&state=${state}&redirect_uri=${redirectUri}`
			window.location.href = url
		},
		onSettled() {
			setLoading(false)
		}
	})

	const handleLoginGitHub = async () => {
		mutate()
	}
	return (
		<Button
			radius='full'
			className='font-medium'
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
