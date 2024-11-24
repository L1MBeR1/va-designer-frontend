import DashBoardSideBar from '@/components/partials/dashboard/sidebar'

import { dashboardPadding } from '@/theme/paddings'

export default function ProfileLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div
			className={`${dashboardPadding} flex flex-row gap-5 w-screen h-screen main`}
		>
			<DashBoardSideBar />
			{children}
		</div>
	)
}
