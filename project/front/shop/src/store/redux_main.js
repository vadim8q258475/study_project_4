import { combineReducers, createStore } from "redux"
import destructLocalStorage from "../utils/destruct_local_storage"
import $ from 'jquery'

let defaultPromoState = {
    promo: '',
    certificate: '',
    email: '',
    country: '',
    name: '', 
    number: '',
    address: '',
    city: '',
    index: '',
    comment: '',
}

let promoReducer = (state=defaultPromoState, action) => {
    switch(action.type){
        case 'updatePromo':
            return {...state, promo: action.payload}
        case 'updateCertificate':
            return {...state, certificate: action.payload}
        case 'updateEmail':
            return {...state, email: action.payload}
        case 'updateCountry':
            return {...state, country: action.payload}
        case 'updateName':
            return {...state, name: action.payload}
        case 'updateNumber':
            return {...state, number: action.payload}
        case 'updateAddress':
            return {...state, address: action.payload}
        case 'updateCity':
            return {...state, city: action.payload}
        case 'updateIndex':
            return {...state, index: action.payload}
        case 'updateComment':
            return {...state, comment: action.payload}
        default:
            return state
    }
}

let defaultCartCounterState = 0

let cartCounterReducer = (state=defaultCartCounterState, action) => {
    switch(action.type){
        case 'plus':
            return state + action.payload
        case 'minus':
            return state - action.payload
        case 'setCartQty':
            return action.payload
        default:
            return state
    }
}

let defaultTotalState = 0

let cartTotalReducer = (state=defaultTotalState, action) => {
    switch(action.type){
        case 'plusTotal':
            return state + action.payload
        case 'minusTotal':
            return state - action.payload
        case 'setTotal':
            return action.payload
        default:
            return state
    }
}

let defaultFirstTotalState = 0

let cartFirstTotalReducer = (state=defaultFirstTotalState, action) => {
    switch(action.type){
        case 'setFirstTotal':
            return action.payload
        default:
            return state
    }
}

let defaultDeliveryState = 'true'

let deliveryReducer = (state=defaultDeliveryState, action) => {
    switch(action.type){
        case 'setDelivery':
            return action.payload
        default:
            return state
    }
}

let defaultConfirmCheckState = 'false'

let ConfirmCheckReducer = (state=defaultConfirmCheckState, action) => {
    switch(action.type){
        case 'setConfirmCheck':
            return action.payload
        default:
            return state
    }
}


let defaultTypeDeliveryState = 'Курьерская доставка Boxberry'

let deliveryTypeReducer = (state=defaultTypeDeliveryState, action) => {
    switch(action.type){
        case 'setDeliveryType':
            return action.payload
        default:
            return state
    }
}


let defaultPermissionState = {
    confirm: false,
    delivery: false,
    payment: false
}

let permissionReducer = (state=defaultPermissionState, action) => {
    switch(action.type){
        case 'setConfirm':
            return {...state, confirm: true}
        case 'setDeliveryPermission':
            return {...state, delivery: true}
        case 'setPayment':
            return {...state, payment: true}
        case 'delConfirm':
            return {...state, confirm: false}
        case 'delDeliveryPermission':
            return {...state, delivery: false}
        case 'delPayment':
            return {...state, payment: false}
        default:
            return state
    }
}

let defaultPromoValueState = {
    middleValue: 0,
    promo: 0,
    certificate: 0,
}

let promoValueReducer = (state=defaultPromoValueState, action) => {
    switch(action.type){
        case 'setPromoValue':
            return {...state, promo: action.payload}
        case 'setMiddleValue':
            return {...state, middleValue: action.payload}
        case 'setCertValue':
            return {...state, certificate: action.payload}
        default:
            return state
    }
}

let defaultAccountState = {
    password: '',
    login: ''
}

let accountReducer = (state=defaultAccountState, action) => {
    switch(action.type){
        case 'setPassword':
            return {...state, password: action.payload}
        case 'setLogin':
            return {...state, login: action.payload}
        default:
            return state
    }
}

let defaultDeliveryPriceState = 0

let deliveryPriceReducer = (state=defaultDeliveryPriceState, action) => {
    switch(action.type){
        case 'setDeliveryPrice':
            return action.payload
        default:
            return state
    }
}

let defaultCartProductsState = []

let cartProductsReducer = (state=defaultCartProductsState, action) => {
    switch(action.type){
        case 'setCartProducts':
            return action.payload
        default:
            return state
    }
}


let rootReducer = combineReducers({
    promo: promoReducer,
    cart: cartCounterReducer,
    total: cartTotalReducer,
    delivery: deliveryReducer,
    deliveryType: deliveryTypeReducer,
    permissions: permissionReducer,
    firstTotal: cartFirstTotalReducer,
    promoValue: promoValueReducer,
    deliveryPrice: deliveryPriceReducer,
    confirmCheck: ConfirmCheckReducer,
    account: accountReducer,
    cartProducts: cartProductsReducer,
})

let store = createStore(rootReducer)


export default store