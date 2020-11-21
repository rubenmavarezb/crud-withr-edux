import React from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

import { useDispatch } from 'react-redux';
import { deleteProductAction, getProductToEditAction } from '../actions/productsAction'


const Product = ({product}) => {

    const { name, price, id} = product;

    const dispatch = useDispatch();
    const history = useHistory();

    const confirmDelete = id => {
        Swal.fire({
            title:'Are you sure??',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton:true,
            confirmButtoncolor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes delete it!!',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            if(result.value){
                dispatch( deleteProductAction(id) )
            }
        })
    }

    const redirectEdit = prod => {
        dispatch( getProductToEditAction(prod) )
        history.push(`/products/edit/${prod.id}`)
    }

    return ( 
        <tr>
            <td>{name}</td>
            <td><span className="font-weight-bold"> $ {price}</span></td>
            <td className="acciones">
                <button
                    type="button"
                    onClick={ () => redirectEdit(product)}
                    className="btn btn-primary mr-2"
                >Edit</button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => confirmDelete(id)}
                >Delete</button>
            </td>
        </tr>
     );
}
 
export default Product;