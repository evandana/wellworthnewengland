import { takeEvery } from 'redux-saga/effects';

import {
    GET_ORDERS,
    PLACE_ORDER,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_FAIL,
} from 'constants.js';

import { updateOrders as updateOrdersAction, placeOrderResponse as placeOrderResponseAction, clearProductQuantities  } from 'actions';

function* getOrders() {
    window._FIREBASE_DB_.ref('/orders/')
        .on('value', (snapshot) => {
            const orders = snapshot.val();
            window._UI_STORE_.dispatch(updateOrdersAction(orders));
        });
    yield;
}

function* placeOrder(orderData) {
    let {orderMeta, products} = orderData;

    window._FIREBASE_DB_.ref('/orders/')
        .push(Object.assign({}, 
            orderMeta,
            { 
                timestamp: new Date(),
                customerInfo: orderMeta.customerInfo,
                state: {
                    placed: true,
                },
                total: orderMeta.total,
            },
            { 
                items: products 
            },
        ), function(error) {
            if (error) {
                let {code, message} = error;
                window._UI_STORE_.dispatch(placeOrderResponseAction({status: RESPONSE_CODE_FAIL, code, message}));
            } else {
                window._UI_STORE_.dispatch(placeOrderResponseAction({status: RESPONSE_CODE_SUCCESS}));
                window._UI_STORE_.dispatch(clearProductQuantities());
            }
    });
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_ORDERS, getOrders),
        takeEvery(PLACE_ORDER, placeOrder),
    ];
}