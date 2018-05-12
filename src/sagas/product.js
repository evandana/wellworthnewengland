import { select, takeEvery } from 'redux-saga/effects';

import {
    GET_PRODUCTS,
    UPDATE_PRODUCTS,
    PENDING,
} from 'constants.js';

import { updateProducts as updateProductsAction  } from 'actions';

function* getProducts() {
    console.log('getProducts')
    window._FIREBASE_DB_.ref('/products/')
        .on('value', (snapshot) => {
            const products = snapshot.val();
            console.log('products gotten', products);
            window._UI_STORE_.dispatch(updateProductsAction(products));
        });
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_PRODUCTS, getProducts),
    ];
}