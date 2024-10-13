import { Header } from '@/components/partials/main/header'

export default function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div>
			<Header />
			{children}
		</div>
	)
}
