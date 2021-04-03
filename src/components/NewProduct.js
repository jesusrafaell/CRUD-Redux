import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//actions from redux
import { createNewProductAction } from '../actions/productActions';
import { showAlert, hiddenAlertAction } from '../actions/alertActions';

const NewProduct = ({history}) => {

  //state
  const [name, saveName] = useState('');
  const [price, savePrice] = useState('');

  //use dispatch = create func
  const dispatch = useDispatch();

  //call action from productActions
  const addProduct = product => dispatch( createNewProductAction(product) );

  //state from store hook
  const loading = useSelector( state => state.products.loading );
  const error = useSelector (state => state.products.error);
  const alert = useSelector(state => state.alert.alert);

  //Submit form
  const handleSubmit = e => {
	e.preventDefault();

	//check form
	if(name.trim() === '' || price <= 0 ){
	  const alert = {
		msg: 'Fields are required',
		class: 'alert alert-danger text-center text-uppercase p4'
	  }
	  dispatch( showAlert(alert) );

	  return;

	}
	//check errors
	dispatch( hiddenAlertAction() );
	
	//create new product
	addProduct({
	  name,
	  price
	});

	//redirect
	history.push('/');
  }

  return (
	<div className="row justify-content-center">
	  <div className="col-md-8">
		<div className="card">
		  <div className="card-body">
			<h2 className="text-center text-warning mb-4 font-weight-bold">
			  Add New Product
			</h2>

			{alert ? <p className={alert.class}>{alert.msg}</p> : null}

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
				  onChange={e => saveName(e.target.value)}
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
				  onChange={e => savePrice( Number(e.target.value) )}
				/>
			  </div>
			  <button
				type="submit"
				className="btn btn-warning text-dark font-weight-bold text-uppercase d-block w-100"
			  > Add
			  </button>
			</form>
			{ loading ? <p>Loading...</p> : null }
			{ error ? <p className="alert alert-danger p2 mt-4 text-center">Error</p> : null }
		  </div>
		</div>
	  </div>
	</div>
  );
}

export default NewProduct;
