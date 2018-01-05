import { takeEvery } from 'redux-saga/effects';

import {
    GET_ORDERS,
    PLACE_ORDER,
    RESPONSE_CODE_SUCCESS,
    RESPONSE_CODE_FAIL,
    REQUEST_UPDATE_ORDER,
} from 'constants.js';

import { updateOrders as updateOrdersAction, placeOrderResponse as placeOrderResponseAction, clearProductQuantities  } from 'actions';

function* getOrders() {
    window._FIREBASE_DB_.ref('/orders/')
        .on('value', (snapshot) => {
            
            // convert obj to array
            const ordersObj = snapshot.val();
            const orderKeys = Object.keys(ordersObj);
            let orders = orderKeys.map( orderKey => {
                ordersObj[orderKey].key = orderKey;
                return ordersObj[orderKey];
            });

            orders.sort( (a,b) => {
                return b.timestamp > a.timestamp ? 1 : -1;
            });

            window._UI_STORE_.dispatch(updateOrdersAction(orders));
        });
    yield;
}

function* requestUpdateOrder(orderData) {
    let {key, order} = orderData;
    window._FIREBASE_DB_.ref('/orders/' + key)
        .set(order);
        //     , 
        //     function(error) {
        //         if (error) {
        //             let {code, message} = error;
        //             window._UI_STORE_.dispatch(placeOrderResponseAction({status: RESPONSE_CODE_FAIL, code, message}));
        //         } else {
        //             window._UI_STORE_.dispatch(placeOrderResponseAction({status: RESPONSE_CODE_SUCCESS}));
        //             window._UI_STORE_.dispatch(clearProductQuantities());
        //         }
        //     }
        // );
    yield;
}

function* placeOrder(orderData) {
    let {orderMeta, products} = orderData;

    window._FIREBASE_DB_.ref('/orders/')
        .push(Object.assign({}, 
            orderMeta,
            { 
                timestamp: orderMeta.timestamp,
                customerInfo: orderMeta.customerInfo,
                state: {
                    placed: true,
                },
                total: orderMeta.total,
                manager: orderMeta.manager,
                branchName: orderMeta.branchName,
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
        takeEvery(REQUEST_UPDATE_ORDER, requestUpdateOrder),
    ];
}