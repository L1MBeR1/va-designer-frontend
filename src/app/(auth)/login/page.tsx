import { Suspense } from 'react'

import { LoginForm } from '@/components/forms/auth/loginForm'

export default function LoginPage() {
	return (
		<main className='flex w-screen h-screen items-center justify-center'>
			<Suspense fallback={<></>}>
				<LoginForm />
			</Suspense>
		</main>
	)
}
