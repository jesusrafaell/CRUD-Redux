import React from 'react'
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useDispatch } from 'react-redux';
import { deleteProductAction, getProductEdit } from '../actions/productActions';

const Product = ({product}) => {

  const { name, price, id } = product;

  const dispatch = useDispatch();
  const history = useHistory();

  //confirm delete product
  const confirmDeleteProduct = id => {
	Swal.fire({
	  title: 'Are you sure?',
	  text: "You won't be able to revert this!",
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Delete'
	}).then((result) => {
	  if (result.isConfirmed) {
		dispatch( deleteProductAction(id) );
	  }
	});
  }

  //redirect to edit page
  const redirectEdit = product => {
	dispatch( getProductEdit(product) );
	history.push(`/products/edit/${product.id}`);
  }

  return (
	<tr>
	  <td>{name}</td>
	  <td><span className="font-weight-bold">${price}</span></td>
	  <td className="acciones">
		<button
		  type="button"
		  onClick={ () => redirectEdit(product) }
		  className="btn btn-warning mr-2">
		  Edit 
		</button>
		<button 
		  type="button"
		  className="btn btn-danger"
		  onClick={() => confirmDeleteProduct(id)}
		>Delete</button>
	  </td>
	</tr>
  ); 
}

export default Product

