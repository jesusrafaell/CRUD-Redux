import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom'
import Swal from 'sweetalert2';
import { editProductAction, deleteProductAction } from '../actions/productActions';

const EditProduct = () => {

  const history = useHistory();
  const dispatch = useDispatch();

  //state product
  const [ product, saveProduct ] = useState({
	name: '',
	price: ''
  });

  const productedit = useSelector(state => state.products.productedit);

  useEffect(() => {
	saveProduct(productedit);
  }, [productedit]);

  //error
  if(!product) return <Redirect to={'/'} />;

  //onchange form
  const handleOnChange = e => {
	saveProduct({
	  ...product,
	  [e.target.name] : e.target.value,
	});
  }

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
		console.log('f')
		//redirect
		history.push('/');
	  }
	});
  }


  const { name, price, id } = product;

  const handleSubmit = e => {
	e.preventDefault();

	dispatch( editProductAction(product) );
	history.push('/');
  }

  return (
	<div className="row justify-content-center">
	  <div className="col-md-8">
		<div className="card">
		  <div className="card-body">
			<h2 className="text-center text-warning mb-4 font-weight-bold">
			  Edit Product
			</h2>
			<form
			  onSubmit={handleSubmit}
			>
			  <div className="form-group">
				<label>Name Product</label>
				<input
				  type="text"
				  className="form-control"
				  placeholder="Name Product"
				  name="name"
				  value={name}
				  onChange={handleOnChange}
				/>
			  </div>
			  <div className="form-group">
				<label>Price Product</label>
				<input
				  type="number"
				  className="form-control"
				  placeholder="Price Product"
				  name="price"
				  value={price}
				  onChange={handleOnChange}
				/>
			  </div>
			  <button
				type="submit"
				className="btn btn-primary text-dark font-weight-bold text-uppercase d-block w-100"
			  > Save change 
			  </button>
			  <button 
				type="button"
				className="btn btn-danger mt-4 "
				onClick={() => confirmDeleteProduct(id)}
			  >Delete!</button>
			</form>
		  </div>
		</div>
	  </div>
	</div>
  );
}

export default EditProduct;
