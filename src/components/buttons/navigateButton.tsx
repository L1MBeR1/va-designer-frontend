'use client'

import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

interface INavigateButtonProps {
	label: string
	url: string
	radius?: 'full' | 'sm' | 'md' | 'lg'
	className?: string
	endContent?: React.ReactNode
	startContent?: React.ReactNode
	variant?: 'bordered' | 'solid' | 'flat'
	color: 'primary' | 'secondary'
	size: 'sm' | 'md' | 'lg'
}

export const NavigateButton = ({
	label,
	url,
	radius,
	className,
	startContent,
	variant,
	color,
	size,
	endContent
}: INavigateButtonProps) => {
	const { push } = useRouter()

	return (
		<Button
			radius={radius}
			className={className}
			onClick={() => {
				push(url)
			}}
			color={color}
			endContent={endContent}
			startContent={startContent}
			variant={variant}
			size={size}
		>
			{label}
		</Button>
	)
}
