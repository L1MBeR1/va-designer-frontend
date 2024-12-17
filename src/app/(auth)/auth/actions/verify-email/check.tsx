'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { VerifyFormStates } from '@/types/token.types'
import { IEmailVerify } from '@/types/user.types'

import { APP_PAGES } from '@/config/pages-url.config'

import Expired from '../expired'

import Success from './success'
import { userService } from '@/services/user.service'

export default function Check() {
	const { push } = useRouter()
	const searchParams = useSearchParams()

	const [state, setState] = useState<VerifyFormStates | null>(null)

	const { mutate } = useMutation({
		mutationKey: ['verifyEmail'],
		mutationFn: (data: IEmailVerify) => userService.verifyEmail(data),
		onSuccess() {
			console.log(true)
			setState(VerifyFormStates.SUCCESS)
		},
		onError(error: any) {
			if (error?.response?.status === 403) {
				setState(VerifyFormStates.EXPIRED)
			} else push(APP_PAGES.NOT_FOUND)
		}
	})

	useEffect(() => {
		const token = searchParams.get('token')

		if (token) {
			console.log(token)
			mutate({ token })
		} else {
			push(APP_PAGES.NOT_FOUND)
		}
	}, [searchParams, mutate, push])

	return (
		<main className='flex w-screen h-screen items-center justify-center'>
			{state === VerifyFormStates.SUCCESS && <Success />}
			{state === VerifyFormStates.EXPIRED && <Expired />}
		</main>
	)
}
