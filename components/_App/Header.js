import { Icon, Image, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import NProgress from 'nprogress'

import { handleLogout } from '../../utils/auth'

const Header = ({ user }) => {
	const router = useRouter()
	const isActive = (route) => route === router.pathname
	const isRoot = user && user.role === 'root'
	const isAdmin = user && user.role === 'admin'
	const isRootOrAdmin = isRoot || isAdmin

	Router.onRouteChangeStart = () => NProgress.start()
	Router.onRouteChangeComplete = () => NProgress.done()
	Router.onRouteChangeError = () => NProgress.done()

	return (
		<Menu fluid id='menu' inverted stackable>
			<Link href='/'>
				<Menu.Item header active={isActive('/')}>
					<Image
						size='mini'
						src='/static/logo.svg'
						style={{ marginRight: '1em' }}
					/>
					Pet Plaza
				</Menu.Item>
			</Link>
			<Link href='/cart'>
				<Menu.Item position='right' header active={isActive('/cart')}>
					<Icon name='cart' size='large' />
					Cart
				</Menu.Item>
			</Link>
			{isRootOrAdmin && (
				<>
					<Link href='/create'>
						<Menu.Item header active={isActive('/create')}>
							<Icon name='add square' size='large' />
							Create
						</Menu.Item>
					</Link>
					<Link href='/create'>
						<Menu.Item header active={isActive('/orders')}>
							<Icon name='shipping' size='large' />
							Orders
						</Menu.Item>
					</Link>
				</>
			)}
			{user ? (
				<>
					<Link href='/pets'>
						<Menu.Item header active={isActive('/pets')}>
							<Icon name='paw' size='large' />
							Pets
						</Menu.Item>
					</Link>
					<Link href='/book'>
						<Menu.Item header active={isActive('/book')}>
							<Icon name='calendar plus outline' size='large' />
							Book
						</Menu.Item>
					</Link>
					<Link href='/account'>
						<Menu.Item header active={isActive('/account')}>
							<Icon name='user' size='large' />
							Account
						</Menu.Item>
					</Link>
					<Menu.Item header onClick={handleLogout}>
						<Icon name='sign out' size='large' />
						Logout
					</Menu.Item>
				</>
			) : (
				<>
					<Link href='/login'>
						<Menu.Item header active={isActive('/login')}>
							<Icon name='sign in' size='large' />
							Login
						</Menu.Item>
					</Link>
					<Link href='/signup'>
						<Menu.Item header active={isActive('/signup')}>
							<Icon name='signup' size='large' />
							Sign Up
						</Menu.Item>
					</Link>
				</>
			)}
		</Menu>
	)
}

export default Header
