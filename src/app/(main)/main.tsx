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
					<div className='space-y-4'>
						<div className='font-primary text-6xl font-normal text-white col-span-3 leading-[4rem] '>
							Создайте своего
						</div>
						<div className='space-y-2'>
							<div className='font-primary text-[115px] font-medium text-white col-span-4 leading-[6rem] '>
								Виртуального
							</div>
							<div className='font-primary text-[115px] font-medium text-white col-span-4 leading-[6rem] '>
								Ассистента
							</div>
						</div>
					</div>
					<div className='text-white flex flex-col gap-4 mt-4'>
						<div className='font-primary text-7xl font-semibold text-primary  leading-[3rem] '>
							1000+
						</div>
						<div className='text-3xl'>Созданных ассистентов</div>
					</div>
					<div className='text-2xl text-white '>
						Наша платформа позволяет быстро и легко создавать виртуальных
						ассистентов для автоматизации взаимодействия с клиентами.
					</div>
					<Button
						className='w-full font-semibold h-16 text-2xl items-center'
						color='primary'
						radius='full'
						onClick={() => {
							push(APP_PAGES.LOGIN)
						}}
					>
						Создать сейчас
					</Button>
				</div>
				<div className='w-1/2 h-full pl-12 flex place-content-center'>
					<img
						src={sphere.src}
						alt='sphere'
					/>
				</div>
			</div>

			{/* <div className='flex flex-col justify-between h-full pb-11'>
				<div className='pt-20 grid grid-cols-4 grid-rows-3 gap-y-9'>
					<div className='font-primary text-[9rem] font-normal text-white col-span-3 leading-[6rem] ml-[-0.6rem]'>
						Создайте своего
					</div>
					<div className='font-primary text-[20px] font-normal text-white mt-4'>
						Легко интегрируйте ассистентов с другими сервисами
					</div>
					<div className='font-primary text-[140px] font-bold text-white col-span-4 leading-[6rem] ml-[-0.6rem]'>
						Виртуального
					</div>
					<div className='text-white flex flex-col gap-4 mt-4'>
						<div className='font-primary text-6xl font-semibold text-primary  leading-[3rem] '>
							1000+
						</div>
						<div className='text-2xl'>Созданных ассистентов</div>
					</div>
					<div className='font-primary text-[140px] font-bold text-white col-start-3 leading-[6rem]'>
						Ассистента
					</div>
				</div>
				<div className='text-[28px] max-w-[45%]  text-white '>
					Наша платформа позволяет быстро и легко создавать виртуальных
					ассистентов для автоматизации взаимодействия с клиентами.{' '}
				</div>
				<Button
					className='w-full h-20 font-semibold  text-[30px] items-center'
					color='primary'
					radius='full'
					endContent={
						<ArrowRight
							size={42}
							strokeWidth={3}
						/>
					}
					onClick={() => {
						push(APP_PAGES.LOGIN)
					}}
				>
					Создать сейчас
				</Button>
			</div> */}
		</section>
	)
}
