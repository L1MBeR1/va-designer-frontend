'use client'

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Link
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PasswordField } from '@/components/fields/passwordField'

import { IPasswordChangeForm } from '@/types/user.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { userService } from '@/services/user.service'

export const ChangePasswordForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors }
	} = useForm<IPasswordChangeForm>()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { push } = useRouter()
	const searchParams = useSearchParams()

	const { mutate } = useMutation({
		mutationKey: ['change-password'],
		mutationFn: (data: IPasswordChangeForm) => userService.changePassword(data),
		onMutate() {
			setLoading(true)
			setError(null)
		},
		onSuccess() {
			push(APP_PAGES.LOGIN)
			toast.success('Пароль успешно сменен!')
			reset()
			setLoading(false)
		},
		onError(error: any) {
			setError('Ошибка при смене пароля. Проверьте данные.')
			setLoading(false)
		}
	})

	const password = watch('password')

	useEffect(() => {
		const token = searchParams.get('token')
		if (token) {
			setValue('token', token)
		} else {
			setError('Токен не найден в URL')
		}
	}, [setValue])
	const onSubmit: SubmitHandler<IPasswordChangeForm> = data => {
		mutate(data)
	}

	return (
		<div className='w-fit h-fit'>
			<Card
				className='p-7 w-[450px] rounded-[30px] gap-3'
				shadow='sm'
			>
				<CardHeader className='flex justify-center'>
					<h2 className='text-2xl font-semibold'>Смена пароля</h2>
				</CardHeader>
				<CardBody className='space-y-6'>
					{error && <p className='text-danger-600'>{error}</p>}
					<div className='flex flex-col gap-1'>
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit(onSubmit)}
						>
							<PasswordField
								label='Пароль'
								register={register}
								registerName='password'
								size={'lg'}
								variant={'bordered'}
								isInvalid={!!errors.password}
								disabled={loading}
								rules={{
									required: 'Пароль обязателен',
									minLength: {
										value: 6,
										message: 'Пароль должен содержать минимум 6 символов'
									}
								}}
							/>
							<PasswordField
								label='Повторите пароль'
								register={register}
								registerName='confirmPassword'
								size={'lg'}
								variant={'bordered'}
								isInvalid={!!errors.confirmPassword}
								disabled={loading}
								rules={{
									required: 'Подтверждение пароля обязательно',
									validate: value =>
										value === password || 'Пароли должны совпадать'
								}}
							/>
							<Button
								radius='full'
								className='full font-medium'
								color='primary'
								type='submit'
								size='lg'
								isLoading={loading}
							>
								Сменить пароль
							</Button>
						</form>
					</div>
				</CardBody>
				<CardFooter className='space-x-2 justify-center font-medium'>
					<p>Вспомнили пароль?</p>
					<Link href='/login'>Войти</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
