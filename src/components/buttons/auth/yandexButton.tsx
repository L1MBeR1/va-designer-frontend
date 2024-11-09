import Yandex from '/public/svgs/yandexLogo.svg'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'

import { EnumAuthProviders, EnumAuthType } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

interface IGithubButtonProps {
	label: string
	purpose: EnumAuthType
}

export const YandexButton = ({ label, purpose }: IGithubButtonProps) => {
	const { mutate } = useMutation({
		mutationKey: ['pkce'],
		mutationFn: () => authService.pkce(),
		onMutate() {
			// setLoading(true)
		},
		onSuccess(response) {
			const { state, codeVerifier, codeChallenge } = response.data

			sessionStorage.setItem('oauth_code_verifier', codeVerifier)
			sessionStorage.setItem('oauth_state', state)
			sessionStorage.setItem('oauth_purpose', purpose)

			const redirectUri = encodeURIComponent(
				`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback?provider=${EnumAuthProviders.yandex}`
			)
			const clientId = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID

			const url = `https://oauth.yandex.ru/authorize?&response_type=code&force_confirm=1&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`
			window.location.href = url
		},
		onSettled() {
			// setLoading(false)
		}
	})

	const handleLoginYandex = async () => {
		mutate()
	}
	return (
		<Button
			onClick={handleLoginYandex}
			startContent={<Yandex />}
			variant='bordered'
		>
			{label}
		</Button>
	)
}
