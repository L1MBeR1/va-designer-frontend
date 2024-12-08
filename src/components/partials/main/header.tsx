'use client'

import Logo from '/public/svgs/logo.svg'
import LogoText from '/public/svgs/logoTextNotFill.svg'
import {
	Button,
	Navbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { APP_PAGES } from '@/config/pages-url.config'

import { mainPadding } from '@/theme/paddings'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [hasScrolled, setHasScrolled] = useState(false)
	const { push } = useRouter()

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setHasScrolled(true)
			} else {
				setHasScrolled(false)
			}
		}
		window.addEventListener('scroll', handleScroll)
		handleScroll()
		return () => {
			window.removeEventListener('scroll', handleScroll)
		}
	}, [])

	return (
		<Navbar
			className={`${mainPadding} fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
				hasScrolled
					? 'bg-background shadow-md py-1'
					: 'bg-transparent py-[30px]'
			}`}
			maxWidth='full'
			onMenuOpenChange={setIsMenuOpen}
			isBlurred={false}
			classNames={{
				wrapper: '!p-0',
				content: '!p-0'
			}}
		>
			<div className='w-full flex flex-row justify-between items-center transition-all duration-300'>
				<NavbarContent className='w-fit'>
					<NavbarBrand
						className={`w-fit transition-all items-center ${
							hasScrolled ? 'gap-3' : 'gap-6'
						}`}
						onClick={() => {
							push(APP_PAGES.HOME)
						}}
					>
						<Logo
							className='transition-all'
							height={hasScrolled ? '40' : '60'}
							width={hasScrolled ? '40' : '60'}
						/>
						<LogoText
							className={`transition-all ${
								hasScrolled
									? 'fill-primary  mt-[-5px]'
									: 'fill-white  mt-[-5px]'
							}`}
							height={hasScrolled ? '26' : '35'}
						/>
					</NavbarBrand>
				</NavbarContent>

				<NavbarContent justify='end'>
					<NavbarItem>
						<Button
							className={`font-semibold border-0  ${!hasScrolled && 'bg-white text-primary'}`}
							color='primary'
							variant={hasScrolled ? 'solid' : 'flat'}
							radius='full'
							onClick={() => {
								push(APP_PAGES.LOGIN)
							}}
						>
							Войти
						</Button>
					</NavbarItem>
				</NavbarContent>
			</div>
		</Navbar>
	)
}
