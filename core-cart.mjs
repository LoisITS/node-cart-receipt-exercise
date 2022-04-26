import {carts, products, promoCode, users} from "./dataset.mjs"; //

import * as fs from "fs"; //file system (fs)
import * as os from "os"; //sistema operativo (os)

const discountedPrice = (price, rate = 0.10) => (price * (1 - rate)).toFixed(2);

const createDelimiter = (openClose, symbol, times) => `${openClose} ${symbol.repeat(times)} ${openClose}`;

const printShopName = () => {
    const {username} = os.userInfo();
    return `${username.toUpperCase()} - Cart ${process.pid}`;
}

function getUser(uuid){
    let user = users.find(user => uuid === user.uuid);
    return user;
}


const getProduct = (productId) => products.find(product => product.ean === productId)

const getPercentageFromPromoCode = function (promoCodeName){

    if(promoCodeName !== '' 
       && promoCodeName !== undefined
       && promoCodeName !== null) {

    let rate = promoCode.find(item => promoCodeName === item.name);
    return rate.percentage;
    }
    return 0;
    
}

const formatProductName = (product) => {
    return product.toLowerCase().charAt(0).toUpperCase() + product.toLowerCase().slice(1)
}

const filterType = (products, type) => product;

const sumCartItem = (list) => {
    let total = 0;
    if (list != null){
        for (let codice of list) {
            let prodotto = products.find(product => product.ean === codice);
            total += prodotto.price;
        }
    }
    return total.toFixed(2);
}

const formatProductList = (products) => products;

const printReceipt = (content, filename) => '';


const getProductByCart = (products) => products;

const getUserDiscount = () => 0;

const receiptFileName = (uuid, date) => '';


export {
    discountedPrice,
    printShopName,
    getUser,
    formatProductName,
    filterType,
    sumCartItem,
    formatProductList,
    printReceipt,
    createDelimiter,
    getProductByCart,
    getUserDiscount,
    receiptFileName,
    getProduct,
    getPercentageFromPromoCode
};

