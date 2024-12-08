import { ArrowLeft, MailCheck } from 'lucide-react'

import { NavigateButton } from '@/components/buttons/navigateButton'

import { APP_PAGES } from '@/config/pages-url.config'

export default function Success() {
	return (
		<section className='flex flex-col items-center justify-center gap-5'>
			<MailCheck
				size={100}
				strokeWidth={2.5}
				color='hsl(var(--nextui-primary)'
			/>
			<div className='font-bold text-5xl text-center'>Почта подтверждена!</div>
			<div className='font-semibold text-xl text-center'>
				Добро пожаловать на платформу для создания виртуальных ассистентов.
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
	)
}
