import background from '/public/backgrounds/main.png'

import { Header } from '@/components/partials/main/header'

import { mainPadding } from '@/theme/paddings'

export default function Home() {
	return (
		<main className='main'>
			<Header />
			<section
				className={`${mainPadding} w-full h-screen pt-28 `}
				style={{
					backgroundImage: `url(${background.src})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center'
				}}
			>
				<div className='text-3xl'>Гостевая страница</div>
			</section>
			<section className='h-32'></section>
		</main>
	)
}
