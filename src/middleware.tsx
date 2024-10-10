import { NextRequest, NextResponse } from 'next/server'

import { APP_PAGES } from './config/pages-url.config'
import { EnumTokens } from './services/auth-token.service'

export async function middleware(request: NextRequest) {
	const authToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

	const isAuthPage = ['/login', '/register', '/'].includes(
		request.nextUrl.pathname
	)
	const isDashboardPage = ['/home'].includes(request.nextUrl.pathname)

	if (authToken && isAuthPage) {
		return NextResponse.redirect(new URL(APP_PAGES.DASHBOARD.HOME, request.url))
	}

	if (!authToken && isDashboardPage) {
		return NextResponse.redirect(new URL(APP_PAGES.LOGIN, request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/', '/login', '/register', '/home']
}
