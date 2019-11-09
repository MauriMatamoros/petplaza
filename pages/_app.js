import App from 'next/app'
import { parseCookies, destroyCookie } from 'nookies'
import axios from 'axios'
import Router from 'next/router'
import { Provider } from 'react-redux'

import Layout from '../components/_App/Layout'
import withReduxStore from '../lib/with-redux-store'
import { redirectUser } from '../utils/auth'
import baseUrl from '../utils/baseUrl'
class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const { token } = parseCookies(ctx)

		let pageProps = {}

		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx)
		}

		if (!token) {
			const isProtectedRoute =
				ctx.pathname === '/account' || ctx.pathname === '/create'
			if (isProtectedRoute) {
				redirectUser(ctx, '/login')
			}
		} else {
			try {
				const payload = {
					headers: {
						Authorization: token
					}
				}
				const url = `${baseUrl}/api/account`
				const { data } = await axios.get(url, payload)
				const user = data
				const isRoot = user.role === 'root'
				const isAdmin = user.role === 'admin'
				const isNotPermitted =
					!(isRoot || isAdmin) && ctx.pathname === '/create'
				if (isNotPermitted) {
					redirectUser(ctx, '/')
				}
				pageProps.user = user
			} catch (error) {
				console.error('Error getting current user', error)
				// handle invalid or tampered tokens
				destroyCookie(ctx, 'token')
				redirectUser(ctx, '/login')
			}
		}

		return { pageProps }
	}

	componentDidMount() {
		window.addEventListener('storage', this.syncLogout)
	}

	syncLogout = (e) => {
		if (e.key === 'logout') {
			window.localStorage.removeItem('logout')
			Router.push('/login')
		}
	}

	render() {
		const { Component, pageProps, reduxStore } = this.props
		return (
			<Provider store={reduxStore}>
				<Layout {...pageProps}>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		)
	}
}

export default withReduxStore(MyApp)
