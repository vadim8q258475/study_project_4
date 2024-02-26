function convertHeader(eng_name){
    let dct = {
        'main': 'Главная', 
        'cmh': 'CMH', 
        'booker': 'BOOKER', 
        'vsrap': 'VSRAP', 
        'gspd': 'GSPD', 
        'snailkick': 'Snailkick', 
        'hoodie': 'Худи', 
        'tshirts': 'Футболки', 
        'out_cloth': 'Верхняя одежда', 
        'sweaters': 'Свитшоты', 
        'scarves': 'Шарфы', 
        'sale': 'Скидки',
        'gift_packs': 'GIFT PACKS'
    }
    return dct[eng_name]
}

function isIn(arr, elem){
    for(let i = 0; i<arr.length; i++){
        if(arr[i] == elem){
            return true
        }
    }
    return false
}

export function convertPath(eng_name){
    let sort_icon = 'https://cdn.icon-icons.com/icons2/2645/PNG/512/arrow_down_up_icon_160466.png'
    let finObj = {
        type: '',
        header:  convertHeader(eng_name)
    }
    let lst1 = ['main', 'cmh', 'booker', 'vsrap', 'gspd', 'snailkick']
    let lst2 = ['hoodie', 'tshirts', 'out_cloth', 'sweaters', 'scarves']
    let lst3 = ['sale', 'gift_packs']
    if(isIn(lst1, eng_name)){
        finObj.type = 'Коллекции'
    }else if(isIn(lst2, eng_name)){
        finObj.type = 'Одежда'
    }
    if(finObj.type==''){
        return (<div className='productsHeaderContainer'>
                        <div className='productsHeader'>
                            {finObj.header}
                        </div>
                        <div className='productsPath productsPathText'>
                            Магазин<div className='slash productsPathText'>/</div>{finObj.header}
                        </div>
                        <div className='productsSort'>
                            <div className='sortImgContainer'><img className='sortImg' src={sort_icon}></img></div>
                        </div>
                </div>)
    }else{
        return (<div className='productsHeaderContainer'>
                        <div className='productsHeader'>
                            {finObj.header}
                        </div>
                        <div className='productsPath productsPathText'>
                            Магазин<div className='slash productsPathText'>/</div>{finObj.type}<div div className='slash productsPathText'>/</div>{finObj.header}
                        </div>
                        <div className='productsSort'>
                            <div className='sortImgContainer'><img className='sortImg' src={sort_icon}></img></div>
                        </div>
                </div>)
    }
}