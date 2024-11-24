'use client'

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Input,
	Link,
	Spinner
} from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { GithubButton } from '@/components/buttons/auth/githubButton'
import { VkButton } from '@/components/buttons/auth/vkButton'
import { YandexButton } from '@/components/buttons/auth/yandexButton'
import { PasswordField } from '@/components/fields/passwordField'

import {
	EnumAuthType,
	IAuthForm,
	OAuthErrorCodes,
	OAuthErrorMessages
} from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export const LoginForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>()
	const [loading, setLoading] = useState(false)
	const [formLoading, setFormLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const queryClient = useQueryClient()
	const searchParams = useSearchParams()
	const { push } = useRouter()

	useEffect(() => {
		const errorUrl = searchParams.get('error')
		const loadingUrl = searchParams.get('redirect')

		if (loadingUrl) setFormLoading(true)

		if (
			errorUrl &&
			Object.values(OAuthErrorCodes).includes(errorUrl as OAuthErrorCodes)
		) {
			setError(OAuthErrorMessages[errorUrl as OAuthErrorCodes])
		} else {
			setError(null)
		}
	}, [searchParams])

	const { mutate } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: IAuthForm) => authService.login(data),
		onMutate() {
			setLoading(true)
			setError(null)
		},
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
			toast.success('Успешный вход в аккаунт!')
			reset()
			push(APP_PAGES.DASHBOARD.HOME)
		},
		onError(error: any) {
			setError('Ошибка при входе. Проверьте данные.')
		},
		onSettled() {
			setLoading(false)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => {
		mutate(data)
	}

	return (
		<div className='w-fit h-fit '>
			{formLoading ? (
				<Spinner />
			) : (
				<Card
					className='p-6 w-[450px] rounded-2xl'
					shadow='sm'
				>
					<CardHeader className='flex gap-3 justify-center'>
						<h2 className='text-2xl font-semibold'>Войти в аккаунт</h2>
					</CardHeader>
					<CardBody className='space-y-6'>
						{error && <p className='text-danger-600'>{error}</p>}
						<div className='flex flex-col gap-3'>
							<VkButton
								label='Войти через Вконтакте'
								purpose={EnumAuthType.login}
							/>
							<YandexButton
								label='Войти через Яндекс'
								purpose={EnumAuthType.login}
							/>
							<GithubButton
								label='Войти через Github'
								purpose={EnumAuthType.login}
							/>
						</div>
						<Divider />
						<div className='flex flex-col gap-1'>
							<form
								className='flex flex-col gap-4'
								onSubmit={handleSubmit(onSubmit)}
							>
								<Input
									label='Почта'
									size={'lg'}
									// placeholder='Введите почту'
									variant={'bordered'}
									isInvalid={!!errors.email}
									{...register('email', { required: 'Почта обязательна' })}
								/>
								<PasswordField
									label='Пароль'
									register={register}
									registerName='password'
									// placeholder='Введите пароль'
									size={'lg'}
									variant={'bordered'}
									isInvalid={!!errors.password}
									rules={{
										required: 'Пароль обязателен',
										minLength: {
											value: 6,
											message: 'Пароль должен содержать минимум 6 символов'
										}
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
									Войти
								</Button>
							</form>
						</div>
					</CardBody>
					<CardFooter className='space-x-2 justify-center font-medium'>
						<p>Нет аккаунта?</p>
						<Link href='/register'>Создать</Link>
					</CardFooter>
				</Card>
			)}
		</div>
	)
}
