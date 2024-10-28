'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'

import { APP_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export default function CallBack() {
	const { push } = useRouter()
	const searchParams = useSearchParams()
	const purposeRef = useRef<string | null>(null)
	const providerRef = useRef<string | null>(null)
	const [hasMutated, setHasMutated] = useState(false)

	const handleOAuthError = useCallback(() => {
		if (purposeRef.current) {
			push(`/${purposeRef.current}?error="service_error"`)
		}
	}, [push])

	const { mutate } = useMutation({
		mutationKey: ['oauth'],
		mutationFn: ({ code, provider }: { code: string; provider: string }) =>
			authService.oauth(code, provider),
		onSuccess() {
			localStorage.removeItem(`oauth_state`)
			localStorage.removeItem(`oauth_purpose`)
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

		const storedState = localStorage.getItem(`oauth_state`)
		const storedPurpose = localStorage.getItem(`oauth_purpose`)

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
			push(`/${purposeRef.current}?error="state_error"`)
			return
		}

		if (typeof code === 'string' && !hasMutated) {
			setHasMutated(true)
			providerRef.current = provider
			mutate({ code, provider })

			push(`/${storedPurpose}?redirect=true`)
		}
	}, [searchParams, mutate, push, hasMutated])

	return (
		<main className='flex w-screen h-screen items-center justify-center'></main>
	)
}
