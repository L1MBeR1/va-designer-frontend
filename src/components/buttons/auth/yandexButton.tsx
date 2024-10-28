import Yandex from '/public/svgs/yandexLogo.svg'
import { Button } from '@nextui-org/react'

import { EnumAuthProviders, EnumAuthType } from '@/types/auth.types'

import { generateState } from '@/utils/auth/generateState'

interface IGithubButtonProps {
	label: string
	purpose: EnumAuthType
}

export const YandexButton = ({ label, purpose }: IGithubButtonProps) => {
	const handleLoginYandex = () => {
		const clientId = process.env.NEXT_PUBLIC_YANDEX_CLIENT_ID
		const state = generateState(128)

		localStorage.setItem('oauth_state', state)
		localStorage.setItem('oauth_purpose', purpose)

		const redirectUri = encodeURIComponent(
			`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback?provider=${EnumAuthProviders.yandex}`
		)

		const yandexAuthUrl = `https://oauth.yandex.ru/authorize?&response_type=code&client_id=${clientId}&state=${state}&redirect_uri=${redirectUri}`
		window.location.href = yandexAuthUrl
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
