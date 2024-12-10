import background from '/public/backgrounds/auth.webp'
import { ArrowLeft } from 'lucide-react'

import { NavigateButton } from '@/components/buttons/navigateButton'
import LongLogo from '@/components/logos/lognLogo'

import { APP_PAGES } from '@/config/pages-url.config'

import { authPadding } from '@/theme/paddings'

export default function NotFound() {
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
			<section className='flex flex-col items-center justify-center gap-5'>
				<div className='font-extrabold text-[300px] font-primary text-primary leading-[15rem]'>
					404
				</div>
				<div className='font-semibold text-xl text-center max-w-[600px]'>
					Страница пропала. А может, она ждёт, пока вы создадите идеального
					виртуального ассистента?
				</div>
				<NavigateButton
					startContent={<ArrowLeft />}
					color='primary'
					className='font-semibold'
					radius='full'
					label='Вернуться на главную'
					url={APP_PAGES.HOME}
					size='lg'
				/>
			</section>
		</main>
	)
}
