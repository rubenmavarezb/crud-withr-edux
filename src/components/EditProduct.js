import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProductAction } from '../actions/productsAction';
import { useHistory } from 'react-router-dom';

const EditProduct = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [item, setItem] = useState({
        name: '',
        price: ''
    })

    const product = useSelector( state => state.products.editproduct);

    useEffect(() => {
        setItem(product);
    }, [product])

    const formOnChange = e => {
        setItem({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    

    const editProductSubmit = (e) => {
        e.preventDefault();
        console.log(item)
        dispatch( editProductAction(item) );

        history.push('/')
    }

    return ( 
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                        Edit product
                    </h2>

                    <form
                        onSubmit={editProductSubmit}
                    >
                        <div className="form-group">
                            <label htmlFor="name">Product name</label>
                            <input
                                 
                                type="text" 
                                className="form-control" 
                                placeholder='Edit product...'
                                name="name"
                                value={item?.name}
                                onChange={formOnChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Product price</label>
                            <input
                                 
                                type="text" 
                                className="form-control" 
                                placeholder='Edit price...'
                                name="price"
                                value={item?.price}
                                onChange={formOnChange} 
                            />
                        </div>
                        <button 
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100" 
                            type="submit"
                            onClick={editProductSubmit}
                        >Save</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
     );
}
 
export default EditProduct;