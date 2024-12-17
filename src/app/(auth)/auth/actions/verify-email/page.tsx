import { Suspense } from 'react'

import Check from './check'

export default function VerifyEmailPage() {
	return (
		<div>
			<Suspense fallback={<></>}>
				<Check />
			</Suspense>
		</div>
	)
}
