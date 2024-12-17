import { Header } from '@/components/partials/main/header'

import MainSection from './main'

export default function Home() {
	return (
		<main className='main'>
			<Header />
			<MainSection />
			<section className='h-32'></section>
		</main>
	)
}
