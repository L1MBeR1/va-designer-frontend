'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ChangePasswordForm } from '@/components/forms/auth/changePasswordForm'

import {
	ITokenVerify,
	TokenPurpose,
	VerifyFormStates
} from '@/types/token.types'

import { APP_PAGES } from '@/config/pages-url.config'

import Expired from '../expired'

import { tokenService } from '@/services/token.service'

export default function Check() {
	const { push } = useRouter()
	const searchParams = useSearchParams()

	const [state, setState] = useState<VerifyFormStates | null>(null)

	const { mutate } = useMutation({
		mutationKey: ['verifyToken'],
		mutationFn: (data: ITokenVerify) => tokenService.verify(data),
		onSuccess() {
			console.log(true)
			setState(VerifyFormStates.SUCCESS)
		},
		onError(error: any) {
			if (error?.response?.status === 403) {
				setState(VerifyFormStates.EXPIRED)
			}
		}
	})

	useEffect(() => {
		const token = searchParams.get('token')

		if (token) {
			console.log(token)
			mutate({ token, purpose: TokenPurpose.PASSWORD_RESET })
		} else {
			push(APP_PAGES.NOT_FOUND)
		}
	}, [searchParams, mutate, push])

	return (
		<main className='flex w-screen h-screen items-center justify-center'>
			{state === VerifyFormStates.SUCCESS && <ChangePasswordForm />}
			{state === VerifyFormStates.EXPIRED && <Expired />}
		</main>
	)
}
