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
  PRODUCT_EDIT_SUCCESS, 
  PRODUCT_EDIT_ERROR
} from '../types';

//state for reducers
const initialState = {
  products: [],
  error: null,
  loading: false,
  productdelete: null,
  productedit: null
}

export default function product(state = initialState, action) {
  switch(action.type){
	case BEGIN_DOWNLOAD_PRODUCTS:
	case ADD_PRODUCT:
	  return {
		...state,
		loading: action.payload 
	  }
	case ADD_PRODUCT_SUCCES:
	  return {
		...state,
		loading: false,
		products: [...state.products, action.payload]
	  }
	case PRODUCT_EDIT_ERROR:
	case PRODUCT_DELETE_ERROR:
	case DOWNLOAD_PRODUCTS_ERROR:
	case ADD_PRODUCT_ERROR:
	  return {
		...state,
		loading: false,
		error: action.payload
	  }
	case DOWNLOAD_PRODUCTS_SUCCESS:
	  return {
		...state,
		loading: false,
		error: null,
		products: action.payload
	  }
	case GET_PRODUCT_DELETE:
	  return {
		...state,
		productdelete: action.payload
	  }
	case PRODUCT_DELETE_SUCCESS:
	  return {
		...state,
		products: state.products.filter( product => product.id !== state.productdelete ),
		productdelete: null
	  }
	case GET_PRODUCT_EDIT:
	  return {
		...state,
		productedit: action.payload
	  }
	case PRODUCT_EDIT_SUCCESS:
	  return {
		...state,
		productedit: null,
		products: state.products.map( product => 
		  product.id === action.payload.id ? product = action.payload 
		  :
		  product
		)
	  }
	default:
	  return state;
  }
}
