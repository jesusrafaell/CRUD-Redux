import React, { Fragment, useEffect } from 'react';
import Product from './Product';

import { useSelector, useDispatch } from 'react-redux';
import { getProductsAction } from '../actions/productActions';

const Products = () => {

  const dispatch = useDispatch();

  useEffect(() => {
	const loadProduct = () => dispatch( getProductsAction() );
	loadProduct();
	// eslint-disable-next-line
  }, []);

  //get state products
  const products = useSelector(state => state.products.products);
  const error = useSelector(state => state.products.error);
  const loading = useSelector(state => state.products.loading);

  return (
	<Fragment> 
	  <h2 className="text-center my-5">List of Products</h2>
	  { error ? <p className="font-weight-bold alert-danger text-center mt-4">Error</p> : null }
	  { loading ? <p className="text-center">Loading...</p> : null}
	  <table className="table table-striped table-dark">
		<thead className="bg-primary">
		  <tr>
			<th scope="col">Name</th>
			<th scope="col">Price</th>
			<th scope="col">#</th>
		  </tr>
		</thead>
		<tbody>
		  {products.length === 0 ? 'Empty product list' : (
			products.map(product => (
			  <Product 
				key={product.id}
				product={product}
			  />
			))
		  )}
		</tbody>
	  </table>
	</Fragment>
  );
}

export default Products;
