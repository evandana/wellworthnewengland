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
                .filter(p => !!p)
                // add custom sorting
                .sort((a, b) => {
                    let aOrder = a.defaultOrder === false ? 999 : a.defaultOrder;
                    let bOrder = b.defaultOrder === false ? 999 : b.defaultOrder;

                    if (aOrder < bOrder) {
                        return -1;
                    } else if ( aOrder > bOrder ) {
                        return 1;
                    } else {
                        return 0;
                    }
                });

            window._UI_STORE_.dispatch(updateProductsAction(products));
        });
    yield;
}

export default function* () {
    yield [
        takeEvery(GET_PRODUCTS, getProducts),
    ];
}