import { takeEvery } from 'redux-saga/effects';

import {
    GET_PRODUCTS,
} from 'constants.js';

import { updateProducts as updateProductsAction } from 'actions';

function* getProducts() {
    window._FIREBASE_DB_.ref('/products/')
        .on('value', (snapshot) => {

            // get vals
            const products = snapshot.val()
                // filter out any null products
                .filter(p => !!p);

            window._UI_STORE_.dispatch(updateProductsAction(products));
        });
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_PRODUCTS, getProducts),
    ];
}