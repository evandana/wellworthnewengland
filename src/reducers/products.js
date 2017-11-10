import {
    TOGGLE_SHOW_DESCRIPTION,
    UPDATE_QUANTITY,
    UPDATE_PRODUCTS,
    PLACE_ORDER,
    CLEAR_PRODUCT_QUANTITIES,
} from '../constants';

const initialState = [
    // {
    //     item: 'ABCD1234',
    //     name: 'Product 1',
    //     options: [{
    //         size: '8 oz',
    //         price: 499,
    //         key: 123,
    //         quantity: 2,
    //     },{
    //         size: '1 gal',
    //         price: 1500,
    //         key: 456
    //     }],
    //     description: 'Some long description goes here. Lorem ipsum and other such nonsense. Espresso is grand.',
    //     imagePath: '',
    //     cost: 0,
    //     key: 'ABCD1234'
    // },
    // {
    //     item: 'SDKLFJLSD237498',
    //     name: 'Product 2',
    //     options: [{
    //         size: '8 oz',
    //         price: 499,
    //         key: 123,
    //     }],
    //     description: 'Short description',
    //     imagePath: '',
    //     cost: 0,
    //     key: 'SDKLFJLSD237498'
    // },
];

function products(state = initialState, action) {
    const { type, row, productId, optionKey, quantity, products, orderMeta, response } = action;

    if (type === TOGGLE_SHOW_DESCRIPTION) {

        state[row].expanded = !state[row].expanded;

        return [
            ...state,
        ];
    } else if (type === UPDATE_QUANTITY) {

        // product
        state[state.findIndex(product => { return product.item === productId})].options
            .forEach(option => {
                if (option.key === optionKey) {
                    option.quantity = parseInt(quantity,10);
                }
                return option;
            });

        return [
            ...state,
        ];
    } else if (type === UPDATE_PRODUCTS) {
        return [
            ...products,
        ];
    } else if (type === CLEAR_PRODUCT_QUANTITIES) {
        return state.map(product => {
            if (product.options) {
                product.options = product.options.map( option => {
                    option.quantity = 0;
                    return option;
                });
                return product;
            } else {
                return product;
            }
        });
    } else {
        return state;
    }
}

export default products;