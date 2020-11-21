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
    EDIT_PRODUCT_SUCCESS, 
    EDIT_PRODUCT_ERROR
} from '../types'

//Each reducer has its own state
const initialState = {
    products: [],
    error: null,
    loading: false,
    deleteproduct: null,
    editproduct: null
}

const productsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_PRODUCTS:
        case ADD_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                loading: false,
                products: [...state.products, action.payload]
            }
        case SET_PRODUCTS_ERROR:
        case ADD_PRODUCT_ERROR:
        case DELETE_PRODUCT_ERROR:
        case EDIT_PRODUCT_ERROR:
            return {
                ...state,
                loading:false,
                error: action.payload
            }
        case SET_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                products: action.payload
            }
        case DELETE_PRODUCT:
            return {
                ...state,
                deleteproduct: action.payload
            }
        case DELETE_PRODUCT_SUCCESS:
            console.log(state.deleteproduct)
            return {
                ...state,
                products: state.products.filter( product => product.id !== state.deleteproduct),
                deleteproduct: null
            }
        case EDIT_PRODUCT:
            return {
                ...state,
                editproduct: action.payload
            }
        case EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                editproduct: null,
                products: state.products.map(product => (product.id === action.payload.id) ? product = action.payload : product)
            }
        default:
            return state;
    }
}

export default productsReducer