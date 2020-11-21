import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProductAction  } from '../actions/productsAction';
import { showAlertAction, hideAlertAction  } from '../actions/alertAction';

const NewProduct = ({history}) => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);

    const dispatch = useDispatch();

    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const alert = useSelector(state => state.alert.alert)


    const addProduct = product => dispatch( addNewProductAction(product) );

    const submitNewProduct = e => {
        e.preventDefault();

        if(name.trim() === '' || price <= 0) {

            const response = {
                msg: 'All fields are required',
                cssClass: 'alert alert-danger text-center text-uppercase'
            }

            dispatch( showAlertAction( response))
            return;
        }

        dispatch( hideAlertAction() );

        addProduct({
            name,
            price
        });

        history.push('/')
    }

    return ( 
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Add new product
                        </h2>
                        {alert ? <p className={alert.cssClass}>{alert.msg}</p> : null}
                        <form
                            onSubmit={submitNewProduct}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Product name</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Product name"
                                    name="name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="price">Product price</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Product price"
                                    name="price"
                                    value={price}
                                    onChange={e => setPrice(Number(e.target.value))}
                                />
                            </div>
                            <button 
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100" 
                                type="submit"
                            >Add</button>
                        </form>

                        { loading ? <p>Loading...</p> : null }
                        { error ? <p className="alert alert-danger p2 mt-4 text-center">There was an error!</p> : null}
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default NewProduct;