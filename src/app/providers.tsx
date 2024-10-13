'use client'

import { NextUIProvider } from '@nextui-org/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import { Toaster } from 'sonner'

export function Providers({ children }: PropsWithChildren) {
	const [client] = useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false
				}
			}
		})
	)
	const router = useRouter()

	return (
		<QueryClientProvider client={client}>
			<NextUIProvider
				locale='ru-RU'
				navigate={router.push}
			>
				{children}
				<Toaster
					position='bottom-right'
					duration={2000}
				/>
				<ReactQueryDevtools initialIsOpen={false} />
			</NextUIProvider>
		</QueryClientProvider>
	)
}
