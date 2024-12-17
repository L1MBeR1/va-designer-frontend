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
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { GithubButton } from '@/components/buttons/auth/githubButton'
import { VkButton } from '@/components/buttons/auth/vkButton'
import { YandexButton } from '@/components/buttons/auth/yandexButton'
import { PasswordField } from '@/components/fields/passwordField'

import { EnumAuthType, IAuthForm } from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export const RegisterForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<IAuthForm>()
	const [loading, setLoading] = useState(false)
	const [authError, setAuthError] = useState<string | null>(null)
	const queryClient = useQueryClient()
	const { push } = useRouter()
	const [formLoading, setFormLoading] = useState(false)

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthForm) => authService.register(data),
		onMutate() {
			setLoading(true)
			setAuthError(null)
		},
		onSuccess() {
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
			push(APP_PAGES.DASHBOARD.HOME)
			toast.info('Вам на почту отправлено письмо для повреждения почты.')
			reset()
			setLoading(false)
		},
		onError(error: any) {
			setAuthError('Ошибка при входе. Проверьте данные.')
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
					className='p-7 w-[450px] rounded-[30px] gap-3'
					shadow='sm'
				>
					<CardHeader className='flex justify-center'>
						<h2 className='text-2xl font-semibold'>Регистрация аккаунта</h2>
					</CardHeader>
					<CardBody className='space-y-6'>
						{authError && <p className='text-danger-600'>{authError}</p>}
						<div className='flex flex-col gap-3'>
							<VkButton
								label='Продолжить через Вконтакте'
								purpose={EnumAuthType.login}
								setLoading={setFormLoading}
								disabled={loading}
							/>
							<YandexButton
								label='Продолжить через Яндекс'
								purpose={EnumAuthType.login}
								setLoading={setFormLoading}
								disabled={loading}
							/>
							<GithubButton
								label='Продолжить через Github'
								purpose={EnumAuthType.login}
								setLoading={setFormLoading}
								disabled={loading}
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
									variant={'bordered'}
									isInvalid={!!errors.email}
									isDisabled={loading}
									{...register('email', { required: 'Почта обязательна' })}
								/>

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
								<Button
									className='full font-medium'
									color='primary'
									radius='full'
									type='submit'
									size='lg'
									isLoading={loading}
								>
									Зарегистрироваться
								</Button>
							</form>
						</div>
					</CardBody>
					<CardFooter className='space-x-2 justify-center font-medium'>
						<p>Уже есть аккаунт?</p>
						<Link href='/login'>Войти</Link>
					</CardFooter>
				</Card>
			)}
		</div>
	)
}
