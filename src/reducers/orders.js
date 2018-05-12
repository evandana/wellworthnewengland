import {
    UPDATE_ORDERS,
    TOGGLE_ORDER_DETAILS,
    REQUEST_UPDATE_ORDER,
} from '../constants';

const initialState = [
    // {
    //     number: 1,
    //     timestamp: 123,
    //     customerInfo: {
    //         email: '',
    //         name: 'Bobby',
    //     }, 
    //     total: 123, 
    //     state: {
    //         fulfilled: false,
    //         outForDelivery: false,
    //         confirmed: true,
    //     }, 
    //     items: [
    //         {
    //             item:'a', 
    //             key: 'asdf123', 
    //             name: 'A name', 
    //             optionSize: '', 
    //             optionKey: 'qwer123', 
    //             optionPrice: 10, 
    //             quantity: 10
    //         }
    //     ]
    // },
    // {
    //     number: 2,
    //     timestamp: 234,
    //     customerInfo: {
    //         email: '',
    //         name: 'Ralph',
    //     }, 
    //     total: 123, 
    //     state: {
    //         fulfilled: false,
    //         outForDelivery: false,
    //         confirmed: false,
    //     }, 
    //     items: [
    //         {
    //             item:'a', 
    //             key: 'asdf123', 
    //             name: 'A name', 
    //             optionSize: '', 
    //             optionKey: 'qwer123', 
    //             optionPrice: 10, 
    //             quantity: 10
    //         }
    //     ]
    // }
];

function orders(state = initialState, action) {
    const { type, orders, row } = action;

    if (type === UPDATE_ORDERS) {
        
        return Object.assign({}, orders);

    } else if (type === TOGGLE_ORDER_DETAILS) {

        state[row].detailsOpen = !state[row].detailsOpen;
        
        return Object.assign({},state);
    } else {
        return state;
    }
}

export default orders;