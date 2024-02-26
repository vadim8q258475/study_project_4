import './delivery_li_drop.css'


export function DeliveryLiElem(props){
    let plus_img = 'https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-Vector-PNG-Picture.png'

    function dropClick(){
        let full_id1 = 'deliveryLiContainer' + props.id
        let full_id2 = 'deliveryInfoLiImg' + props.id
        let elem = document.getElementById(full_id1)
        let img = document.getElementById(full_id2)
        if(elem.style.maxHeight=='47.6px' || elem.style.maxHeight == ''){
            elem.style.maxHeight = '200px'
            img.style.rotate = '45deg'
        }else{
            elem.style.maxHeight = '47.6px'
            img.style.rotate = '0deg'
        }
    }
    return (
        <div className='deliveryLiContainer deliveryFirst' id={`deliveryLiContainer${props.id}`}>
            <div className='deliveryInfoLiFlexContainer' onClick={dropClick}>
                <div className='deliveryInfoLiText'>{props.head}</div>
                <div className='deliveryInfoLiImgContainer'>
                    <img className='deliveryInfoLiImg' src={plus_img} id={`deliveryInfoLiImg${props.id}`}></img>
                </div>
            </div>
            <div className='deliverydrop'>
                {props.text}
            </div>
        </div>
    )
}