import axios from 'axios'

import ProductList from '../components/Index/ProductList'
import ProductPagination from '../components/Index/ProductPagination'
import baseUrl from '../utils/baseUrl'

const Home = ({ products, totalPages }) => {
	return (
		<>
			<ProductList products={products} />
			<ProductPagination totalPages={totalPages} />
		</>
	)
}

Home.getInitialProps = async ({ query: { page } }) => {
	if (!Boolean(page)) {
		page = 1
	}
	const size = 9
	const url = `${baseUrl}/api/products`
	const payload = { params: { page, size } }
	const {
		data: { products, totalPages }
	} = await axios.get(url, payload)
	return {
		products,
		totalPages
	}
}

export default Home
