import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCES,
  ADD_PRODUCT_ERROR,
  BEGIN_DOWNLOAD_PRODUCTS,
  DOWNLOAD_PRODUCTS_SUCCESS, 
  DOWNLOAD_PRODUCTS_ERROR, 
  GET_PRODUCT_DELETE,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_ERROR, 
  GET_PRODUCT_EDIT, 
  BEGIN_EDIT_PRODUCT,
  PRODUCT_EDIT_SUCCESS, 
  PRODUCT_EDIT_ERROR
} from '../types';

import api  from '../config/axios';
import Swal from 'sweetalert2';

//create new prodcuts
export function createNewProductAction(product) {
  return async (dispatch) => {
	dispatch( addProduct() );

	try {
	  //insert in API
	  await api.post('/products', product);
	  dispatch( addProductSucces(product) );

	  //alert
	  Swal.fire(
		'Correct',
		'Product added',
		'success'
	  );

	} catch (e) {
	  console.log(e);

	  dispatch( addProductError(true) );

	  //alert errro
	  Swal.fire({
		icon: 'error',
		title: 'Error',
		text: 'Error, try again'
	  })
	}
  }
}

const addProduct = () => ({
  type: ADD_PRODUCT, 
  payload: true
});

const addProductSucces = product => ({
  type: ADD_PRODUCT_SUCCES,
  payload: product
});

const addProductError = state => ({
  type: ADD_PRODUCT_ERROR,
  payload: state
});

//download products
export function getProductsAction() {
  return async (dispatch) => {
	dispatch( downloadProducts() );
	try {
	  const res = await api.get('/products');
	  dispatch( downloadProductsSuccess(res.data) );

	} catch (e) {

	  console.log(e);
	  dispatch( downloadProductsError() );
	}
  }
}

const downloadProducts = () => ({
  type: BEGIN_DOWNLOAD_PRODUCTS,
  payload: true
});

const downloadProductsSuccess = products => ({
  type: DOWNLOAD_PRODUCTS_SUCCESS,
  payload: products
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCTS_ERROR,
  payload: true
});

//delete product
export function deleteProductAction(id){
  return async(dispatch) => {
	dispatch(getProductDelete(id));
	try {
	  await api.delete(`/products/${id}`);
	  dispatch( deleteProductSuccess() );
	  
	  //yes delete
	  Swal.fire(
		'Deleted',
		'Your product was removed',
		'success'
	  )
	} catch (e) {
	  dispatch( deleteProductError() );
	}
  }
}

const getProductDelete = id => ({
  type: GET_PRODUCT_DELETE,
  payload: id
});

const deleteProductSuccess = () => ({
  type: PRODUCT_DELETE_SUCCESS
});

const deleteProductError = () => ({
  type: PRODUCT_DELETE_ERROR
});

//get product
export function getProductEdit(product){
  return (dispatch) => {
	dispatch(getProductAction(product));
  }
}

const getProductAction = product => ({
  type: GET_PRODUCT_EDIT,
  payload: product
});

//edit product in api and state
export function editProductAction(product) {
  return async (dispatch) => {
	dispatch(editProduct());
	try {
	  api.put(`/products/${product.id}`, product);
	  dispatch(editProductSuccess(product));
	} catch (e) {
	  dispatch(editProductError());
	}
  }
}

const editProduct = () => ({
  type: BEGIN_EDIT_PRODUCT
})

const editProductSuccess = product => ({
  type: PRODUCT_EDIT_SUCCESS,
  payload: product
})


const editProductError = () => ({
  type: PRODUCT_EDIT_ERROR
})
