'use client'

import Logo from '/public/svgs/logoLongBlue.svg'
import { useRouter } from 'next/navigation'

import { APP_PAGES } from '@/config/pages-url.config'

export default function LongLogo() {
	const { push } = useRouter()
	return (
		<>
			<Logo
				className='cursor-pointer'
				width='165'
				height='45'
				onClick={() => {
					push(APP_PAGES.HOME)
				}}
			/>
		</>
	)
}
