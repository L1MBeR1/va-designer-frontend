'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { toast } from 'sonner'

import { IOAuth } from '@/types/auth.types'

import { APP_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export default function CallBack() {
	const { push } = useRouter()
	const searchParams = useSearchParams()
	const purposeRef = useRef<string | null>(null)
	const providerRef = useRef<string | null>(null)
	const deviceIdRef = useRef<string | null>(null)
	const CodeVerifierRef = useRef<string | null>(null)

	const handleOAuthError = useCallback(() => {
		if (purposeRef.current) {
			push(`/${purposeRef.current}?error=service_error`)
		}
	}, [push])

	const { mutate } = useMutation({
		mutationKey: ['oauth'],
		mutationFn: (data: IOAuth) => authService.oauth(data),
		onSuccess() {
			localStorage.removeItem(`oauth_state`)
			localStorage.removeItem(`oauth_purpose`)
			localStorage.removeItem(`oauth_code_verifier`)
			push(APP_PAGES.DASHBOARD.HOME)
			toast.success('Успешный вход в аккаунт!')
		},
		onError() {
			handleOAuthError()
		}
	})

	useEffect(() => {
		const code = searchParams.get('code')
		const state = searchParams.get('state')
		const provider = searchParams.get('provider')
		const error = searchParams.get('error')
		const deviceId = searchParams.get('device_id')

		const storedState = localStorage.getItem(`oauth_state`)
		const storedPurpose = localStorage.getItem(`oauth_purpose`)
		const storedCodeVerifier = localStorage.getItem(`oauth_code_verifier`)

		purposeRef.current = storedPurpose

		if (error && storedState == state && storedPurpose) {
			push(`/${purposeRef.current}?error=${error}`)
			return
		}

		if (!code || !state || !provider || !storedPurpose) {
			push(APP_PAGES.NOT_FOUND)
			return
		}

		if (state !== storedState) {
			console.error('State mismatch, possible CSRF attack!')
			push(`/${purposeRef.current}?error=state_error`)
			return
		}

		if (typeof code === 'string') {
			providerRef.current = provider
			deviceIdRef.current = deviceId
			CodeVerifierRef.current = storedCodeVerifier
			mutate({
				code,
				provider,
				deviceId,
				codeVerifier: storedCodeVerifier
			})

			push(`/${storedPurpose}?redirect=true`)
		}
	}, [searchParams, mutate, push])

	return (
		<main className='flex w-screen h-screen items-center justify-center'></main>
	)
}
