import { 
    ADD_PRODUCT,
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_ERROR,
    SET_PRODUCTS,
    SET_PRODUCTS_SUCCESS,
    SET_PRODUCTS_ERROR,
    DELETE_PRODUCT,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_ERROR,
    EDIT_PRODUCT,
    EDIT_PRODUCT_ERROR,
    EDIT_PRODUCT_SUCCESS,
    EDITING_PRODUCT
} from '../types';

import axiosClient from '../config/axios';
import Swal from 'sweetalert2';


//Function to post in the DB
export function addNewProductAction(product){
    return async (dispatch) => {
        dispatch( addProduct() );

        try {
            //Post in API
            await axiosClient.post('/productos', product);

            //Post was 200
            dispatch( addProductSuccessful(product) );

            //Sweet alert
            Swal.fire(
                'Done!',
                'The product was added succesfully',
                'success'
            )

        } catch (error) {
            console.log(error);

            //Post was 404
            dispatch( addProductError(true) );

            Swal.fire({
                icon: 'error',
                title: 'Oops!!',
                text: 'There was an error, try again'
            })
        }
    }
}

const addProduct = () => ({
    type:ADD_PRODUCT,
    payload: true
})

const addProductSuccessful = product => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product
})

const addProductError = state => ({
    type: ADD_PRODUCT_ERROR,
    payload: state
})

///////////////////////////////////////////////////

//Function to get data from DB

export function getProductsAction(){
    return async (dispatch) => {
        dispatch( getProducts() );

        try {
            const response = await axiosClient.get('/productos');
            dispatch( getProductsSuccessfully(response.data) );
        } catch (error) {
            console.log(error)
            dispatch( getProductsError() )
        }
    }
}


const getProducts = () => ({
    type: SET_PRODUCTS,
    payload: true
})

const getProductsSuccessfully = data => ({
    type: SET_PRODUCTS_SUCCESS,
    payload: data
})
const getProductsError = () => ({
    type: SET_PRODUCTS_ERROR,
    payload: true
})


//////////////////////////////////////////////////////////////

//Function to select and delete product

export function deleteProductAction(id){
    return async (dispatch) => {
        dispatch( deleteProduct(id) );

        Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
        )
        
        try {
            await axiosClient.delete(`/productos/${id}`);
            dispatch( deleteProductSuccessfully() )
        } catch (error) {
            console.log(error)
            dispatch( deleteProductError() );
        }
    }
}

const deleteProduct = id => ({
    type: DELETE_PRODUCT,
    payload: id
})

const deleteProductSuccessfully = () => ({
    type: DELETE_PRODUCT_SUCCESS
})

const deleteProductError = () => ({
    type: DELETE_PRODUCT_ERROR,
    payload: true
})

//Edit product
export function getProductToEditAction(product){
    return (dispatch) => {
        dispatch( getProductToEdit(product))
    }
}

const getProductToEdit = product => ({
    type:EDIT_PRODUCT,
    payload: product
})

//Editing a product in the api and state

export function editProductAction(product){
    return async (dispatch) => {
        dispatch( editProduct() )

        try {
            axiosClient.put(`/productos/${product.id}`, product);
            dispatch( editProductSuccess(product) )
        } catch (error) {
            console.log(error);
            dispatch( editProductError() )
        }
    }
}

const editProduct = () => ({
    type:EDITING_PRODUCT
})

const editProductSuccess = product => ({
    type: EDIT_PRODUCT_SUCCESS,
    payload: product
})

const editProductError = () => ({
    type: EDIT_PRODUCT_ERROR,
    payload:true
})