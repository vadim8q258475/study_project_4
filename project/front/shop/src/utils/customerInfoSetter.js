import { useDispatch } from "react-redux"

export function customerInfoSetter(){
    //let dispatch = useDispatch()
    let key_dct = {
        'promo': 'updatePromo',
        'certificate': 'updateCertificate',
        'email': 'updateEmail',
        'country': 'updateCountry',
        'name': 'updateName', 
        'number': 'updateNumber',
        'address': 'updateAddress',
        'city': 'updateCity',
        'index': 'updateIndex',
        'deliveryType': 'setDelivery',
        'deliveryMethod': 'setDeliveryType',

        'total': 'setTotal',
        'midTotal': 'setMiddleValue',
        'oldTotal': 'setFirstTotal',
        'certValue': 'setCertValue',
        'promoValue': 'setPromoValue',
        'confirmCheck': 'setConfirmCheck',
        'deliveryPrice': 'setDeliveryPrice'
    }
    for(let key in key_dct){
        //dispatch({type: key_dct[key], payload: localStorage.getItem(key)})
    }
}