import VK from '/public/svgs/vkLogo.svg'
import { Button } from '@nextui-org/react'

interface IGithubButtonProps {
	label: string
}

export const VkButton = ({ label }: IGithubButtonProps) => {
	return (
		<Button
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
