import { Button, Input } from '@nextui-org/react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { RegisterOptions, UseFormRegister } from 'react-hook-form'

type Variant = 'flat' | 'faded' | 'bordered' | 'underlined'
type Size = 'sm' | 'md' | 'lg'

interface IPasswordInputProps {
	label: string
	placeholder?: string
	size: Size
	variant: Variant
	register: UseFormRegister<any>
	registerName: string
	rules?: RegisterOptions
	isInvalid?: boolean
	errorMessage?: string
}

export function PasswordField({
	label,
	placeholder,
	size,
	variant,
	register,
	registerName,
	rules,
	isInvalid,
	errorMessage
}: IPasswordInputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible)
	}

	return (
		<>
			<Input
				label={label}
				placeholder={placeholder}
				type={isPasswordVisible ? 'text' : 'password'}
				variant={variant}
				size={size}
				endContent={
					<Button
						isIconOnly
						variant='light'
						onPress={togglePasswordVisibility}
						aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
					>
						{isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
					</Button>
				}
				isInvalid={isInvalid}
				errorMessage={errorMessage}
				{...register(registerName, rules)}
			/>
		</>
	)
}
