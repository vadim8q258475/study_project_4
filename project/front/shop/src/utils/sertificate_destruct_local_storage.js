function isIn(arr, elem){
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == elem){
            return true
        }
    }
    return false
}

export default function certificateDestructLocalStorage(){
    let arr = []
    for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        let qty = parseInt(localStorage.getItem(key));    
        if(isIn(['1000', '3000', '5000', '10000', '20000'], key)){
            arr.push({
                nominal: parseInt(key),
                qty: qty,
            })
        }  
    }
    return arr
}