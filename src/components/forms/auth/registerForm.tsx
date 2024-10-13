'use client'

import Github from '/public/svgs/githubLogo.svg'
import VK from '/public/svgs/vkLogo.svg'
import Yandex from '/public/svgs/yandexLogo.svg'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Input,
	Link
} from '@nextui-org/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { PasswordField } from '@/components/fields/passwordField'

import { IAuthForm } from '@/types/auth.types'

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

	const { mutate } = useMutation({
		mutationKey: ['register'],
		mutationFn: (data: IAuthForm) => authService.register(data),
		onMutate() {
			setLoading(true)
			setAuthError(null)
		},
		onSuccess() {
			toast.success('Успешный вход в аккаунт!')
			reset()
			push(APP_PAGES.DASHBOARD.HOME)
			queryClient.refetchQueries({ queryKey: ['profile'], type: 'active' })
		},
		onError(error: any) {
			setAuthError('Ошибка при входе. Проверьте данные.')
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
			<Card className='p-4 w-[400px]'>
				<CardHeader className='flex gap-3 justify-center'>
					<h2 className='text-2xl font-semibold'>Cоздать аккаунт</h2>
				</CardHeader>
				<CardBody className='space-y-4'>
					<div className='flex flex-col gap-2'>
						<Button
							startContent={
								<VK
									width='25'
									height='25'
								/>
							}
							variant='bordered'
						>
							Продолжить через Vk
						</Button>
						<Button
							startContent={<Yandex />}
							variant='bordered'
						>
							Продолжить через
						</Button>
						<Button
							startContent={
								<Github
									width='25'
									height='25'
								/>
							}
							variant='bordered'
						>
							Продолжить через
						</Button>
					</div>
					<div className='flex flex-col gap-1'>
						<form
							className='flex flex-col gap-3'
							onSubmit={handleSubmit(onSubmit)}
						>
							<Input
								label='Почта'
								size={'md'}
								variant={'bordered'}
								isInvalid={!!errors.email}
								{...register('email', { required: 'Почта обязательна' })}
							/>

							<PasswordField
								label='Пароль'
								register={register}
								registerName='password'
								size={'md'}
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
								className='full'
								color='primary'
								type='submit'
								size='md'
								isLoading={loading}
							>
								Войти
							</Button>
						</form>
					</div>
				</CardBody>
				<Divider />
				<CardFooter>
					<Link
						isExternal
						showAnchorIcon
						href='https://github.com/nextui-org/nextui'
					>
						Visit source code on GitHub.
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
