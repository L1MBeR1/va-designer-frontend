import { Suspense } from 'react'

import { LoginForm } from '@/components/forms/auth/loginForm'

export default function LoginPage() {
	return (
		<>
			<Suspense fallback={<></>}>
				<LoginForm />
			</Suspense>
		</>
	)
}
