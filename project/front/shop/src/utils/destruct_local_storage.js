function isIn(arr, elem){
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == elem){
            return true
        }
    }
    return false
}

export default function destructLocalStorage(){
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
        'deliveryPrice': 'setDeliveryPrice',
        'password': '',
        'login': '',
        'products': '',
    }
    let key_lst = []
    for(let key in key_dct){
        key_lst.push(key.toString())
    }
    key_lst.push('token')

    let arr = []
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        if(!isIn(['1000', '3000', '5000', '10000', '20000'], key) && !isIn(key_lst, key)){
            let id = parseInt(key.split(' ')[0])
            let size = key.split(' ')[1]
            let qty = parseInt(localStorage.getItem(key))
            arr.push({
                id: id,
                size: size,
                qty: qty,
            })
        }   
    }
    return arr
}