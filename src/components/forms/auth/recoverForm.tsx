'use client'

import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Link
} from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ISendMail } from '@/types/mail.types'
import { IRecoveryForm } from '@/types/user.types'

import { mailService } from '@/services/mail.service'

export const RecoveryForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm<ISendMail>()
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const { mutate } = useMutation({
		mutationKey: ['recovery'],
		mutationFn: (data: ISendMail) => mailService.sendPasswordResetMail(data),
		onMutate() {
			setIsLoading(true)
			setError(null)
		},
		onSuccess() {
			toast.success('Письмо успешно отправлено!')
			reset()
		},
		onError(error: any) {
			setError('Ошибка при отправке письма. Проверьте данные.')
		},
		onSettled() {
			setIsLoading(false)
		}
	})

	const onSubmit: SubmitHandler<IRecoveryForm> = data => {
		mutate(data)
	}

	return (
		<div className='w-fit h-fit '>
			<Card
				className='p-7 w-[450px] rounded-[30px] gap-3'
				shadow='sm'
			>
				<CardHeader className='flex justify-center'>
					<h2 className='text-2xl font-semibold'>Восстановление пароля</h2>
				</CardHeader>
				<CardBody className='space-y-6'>
					{error && <p className='text-danger-600'>{error}</p>}
					<div className='flex flex-col gap-1'>
						<form
							className='flex flex-col gap-4'
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className='font-secondary text-bold'>
								Введите адрес почты, на которую зарегистрирован аккаунт и вам
								придет письмо с инструкцией для восстановления
							</div>
							<Input
								label='Почта'
								isDisabled={isLoading}
								size={'lg'}
								// placeholder='Введите почту'
								variant={'bordered'}
								isInvalid={!!errors.email}
								{...register('email', { required: 'Почта обязательна' })}
							/>
							<Button
								radius='full'
								className='full font-medium'
								color='primary'
								type='submit'
								size='lg'
								isLoading={isLoading}
							>
								Прислать письмо
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
