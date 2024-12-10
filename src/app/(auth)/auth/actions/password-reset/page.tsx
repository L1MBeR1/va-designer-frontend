import { Suspense } from 'react'

import Check from './check'

export default function PasswordResetPage() {
	return (
		<div>
			<Suspense fallback={<></>}>
				<Check />
			</Suspense>
		</div>
	)
}
