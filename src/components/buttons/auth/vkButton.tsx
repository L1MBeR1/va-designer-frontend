import VK from '/public/svgs/vkLogo.svg'
import { Button } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'

import { EnumAuthProviders, EnumAuthType } from '@/types/auth.types'

import { authService } from '@/services/auth.service'

interface IVkButtonProps {
	label: string
	purpose: EnumAuthType
	setLoading: (isLoading: boolean) => void
	disabled?: boolean
}

export const VkButton = ({
	label,
	purpose,
	setLoading,
	disabled
}: IVkButtonProps) => {
	const { mutate } = useMutation({
		mutationKey: ['pkce'],
		mutationFn: () => authService.pkce(),
		onSuccess(response) {
			const { state, codeVerifier, codeChallenge } = response.data

			sessionStorage.setItem('oauth_code_verifier', codeVerifier)
			sessionStorage.setItem('oauth_state', state)
			sessionStorage.setItem('oauth_purpose', purpose)

			const redirectUri = encodeURIComponent(
				`${process.env.NEXT_PUBLIC_FRONT_END_URL}/auth/callback?provider=${EnumAuthProviders.vk}`
			)
			const clientId = process.env.NEXT_PUBLIC_VK_CLIENT_ID

			const url = `https://id.vk.com/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256&scope=email`
			window.location.href = url
		},
		onError() {
			setLoading(false)
		}
	})

	const handleLoginVk = async () => {
		setLoading(true)
		mutate()
	}
	return (
		<Button
			radius='full'
			className='font-medium'
			onClick={handleLoginVk}
			startContent={
				<VK
					width='25'
					height='25'
				/>
			}
			variant='bordered'
			isDisabled={disabled}
		>
			{label}
		</Button>
	)
}
