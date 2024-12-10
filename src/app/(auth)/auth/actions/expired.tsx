import { ArrowLeft, TimerOff } from 'lucide-react'

import { NavigateButton } from '@/components/buttons/navigateButton'

import { APP_PAGES } from '@/config/pages-url.config'

export default function Expired() {
	return (
		<section className='flex flex-col items-center justify-center gap-5'>
			<TimerOff
				size={100}
				strokeWidth={2.5}
				color='hsl(var(--nextui-primary)'
			/>
			<div className='font-bold text-5xl text-center'>
				Токен подтверждения устарел
			</div>
			<div className='font-semibold text-xl text-center'>
				Не переживайте, просто запросите новый токен, и мы снова отправим вам
				ссылку!
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
