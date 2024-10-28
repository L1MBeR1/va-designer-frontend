import { Suspense } from 'react'

import CallBack from './callback'

export default function CallBackPage() {
	return (
		<div>
			<Suspense fallback={<></>}>
				<CallBack />
			</Suspense>
		</div>
	)
}
