'use client'

import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { APP_PAGES } from '@/config/pages-url.config'

import { mainPadding } from '@/theme/paddings'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { push } = useRouter()

	return (
		<Navbar
			isBordered
			className={`${mainPadding} fixed top-0 left-0 w-full z-50`}
			maxWidth='full'
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			classNames={{
				wrapper: '!p-0',
				content: '!p-0'
			}}
		>
			<div className='grid grid-cols-3 items-center w-full'>
				<NavbarContent>
					<NavbarBrand
						className='cursor-pointer'
						onClick={() => {
							push(APP_PAGES.HOME)
						}}
					>
						LOGO
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent className='hidden md:flex gap-6 justify-start font-semibold'></NavbarContent>

				<NavbarContent justify='end'>
					<NavbarItem>
						<Button
							color='primary'
							onClick={() => {
								push(APP_PAGES.LOGIN)
							}}
						>
							Вход
						</Button>
					</NavbarItem>
				</NavbarContent>
			</div>

			{/* <NavbarMenu className='sm:hidden'>
				<NavbarMenuItem>
					<Link
						className='w-full'
						href='#'
						size='lg'
					>
						Пример
					</Link>
				</NavbarMenuItem>
			</NavbarMenu> */}
		</Navbar>
	)
}
