'use client'

import background from '/public/backgrounds/main.png'
import sphere from '/public/images/sphere.png'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { APP_PAGES } from '@/config/pages-url.config'

import { mainPadding } from '@/theme/paddings'

export default function MainSection() {
	const { push } = useRouter()
	return (
		<section
			className={`${mainPadding} w-full h-screen pt-10 `}
			style={{
				backgroundImage: `url(${background.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}
		>
			<div className='flex flex-row h-full pb-14'>
				<div className='flex flex-col w-1/2 h-full pt-32 justify-between z-10'>
					<div className='space-y-9'>
						<div className='font-primary text-6xl font-normal text-white col-span-3 leading-[1.5rem]'>
							Создайте своего
						</div>
						<div className='space-y-2'>
							<div className='font-primary text-[115px] font-medium text-white col-span-4 leading-[6rem] -ml-1'>
								Виртуального
							</div>
							<div className='font-primary text-[115px] font-medium text-white col-span-4 leading-[6rem] -ml-1'>
								Ассистента
							</div>
						</div>
						<Button
							className='w-1/2 font-semibold h-16 text-2xl items-center'
							color='primary'
							radius='full'
							onClick={() => {
								push(APP_PAGES.LOGIN)
							}}
						>
							Создать сейчас
						</Button>
					</div>

					<div className='space-y-9'>
						<div className='text-white flex flex-col gap-2 mt-4'>
							<div className='font-primary text-6xl font-semibold text-primary  leading-[3rem] '>
								1000+
							</div>
							<div className='text-2xl'>Созданных ассистентов</div>
						</div>
						<div className='text-2xl text-white '>
							Наша платформа позволяет быстро и легко создавать виртуальных
							ассистентов для автоматизации взаимодействия с клиентами
						</div>
					</div>
				</div>
				<div className='w-1/2 h-full pl-12 '>
					<img
						src={sphere.src}
						alt='sphere'
					/>
				</div>
			</div>
		</section>
	)
}
