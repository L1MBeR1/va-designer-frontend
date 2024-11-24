import type { Metadata } from 'next'
import { Montserrat, Open_Sans } from 'next/font/google'

import { SITE_NAME } from '@/constants/seo.constants'

import './globals.css'
import { Providers } from './providers'

const openSans = Open_Sans({
	subsets: ['latin'],
	variable: '--font-open-sans',
	weight: ['300', '400', '500', '600', '700'],
	display: 'swap'
})

const montserrat = Montserrat({
	subsets: ['latin'],
	variable: '--font-montserrat',
	weight: ['500', '600', '700', '800', '900'],
	display: 'swap'
})

export const metadata: Metadata = {
	title: {
		default: SITE_NAME,
		template: `%s | ${SITE_NAME}`
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html
			lang='en'
			className={`${openSans.variable} ${montserrat.variable}`}
		>
			<body className='antialiased'>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
