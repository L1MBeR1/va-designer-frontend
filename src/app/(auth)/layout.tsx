import background from '/public/backgrounds/auth.webp'

import LongLogo from '@/components/logos/lognLogo'

import { authPadding } from '@/theme/paddings'

export default function AuthLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main
			className={`main flex w-screen h-screen items-center justify-center`}
			style={{
				backgroundImage: `url(${background.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}
		>
			<nav className={`fixed top-0 left-0 w-full mt-[30px] ${authPadding}`}>
				<LongLogo />
			</nav>

			{children}
		</main>
	)
}
