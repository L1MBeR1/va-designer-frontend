'use client'

import ProfileBlank from '/public/webps/profileBlank.webp'
import { Avatar, Tab, Tabs } from '@nextui-org/react'
import { FolderKanban, House, PanelsTopLeft } from 'lucide-react'
import { usePathname } from 'next/navigation'

import AccountPopover from '@/components/popovers/accountPopover'

import useProfile from '@/hooks/useProfile'

export default function DashBoardSideBar() {
	const pathname = usePathname()
	const { data, isLoading, isFetching } = useProfile()

	return (
		<>
			<aside className='w-52 h-full space-y-4 p-3 rounded-2xl border flex flex-col justify-between'>
				<div className='space-y-4'>
					<div>LOGO</div>
					<Tabs
						classNames={{
							tabList: 'bg-transparent'
						}}
						aria-label='Profile Options'
						selectedKey={pathname}
						isVertical={true}
						color='primary'
						fullWidth={true}
						size={'md'}
					>
						<Tab
							className='justify-start'
							key='/home'
							title={
								<div className='flex flex-row space-x-2'>
									<House size='20' />
									<p>Главная</p>
								</div>
							}
							href='/home'
						/>
						<Tab
							className='justify-start'
							key='/projects'
							title={
								<div className='flex flex-row space-x-2'>
									<FolderKanban size='20' />
									<p>Проекты</p>
								</div>
							}
							href='/projects'
						/>
						<Tab
							className='justify-start'
							key='/templates'
							title={
								<div className='flex flex-row space-x-2'>
									<PanelsTopLeft size='20' />
									<p>Шаблоны</p>
								</div>
							}
							href='/templates'
						/>
					</Tabs>
				</div>
				<div>
					<AccountPopover>
						<div className='flex flex-row gap-4'>
							<Avatar
								size='sm'
								isBordered
								src={data?.image ? data.image : ProfileBlank.src}
							/>
							<p className='text-sm'>{data?.name}</p>
						</div>
					</AccountPopover>
				</div>
			</aside>
		</>
	)
}
