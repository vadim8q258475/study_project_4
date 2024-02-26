import './order_product.css'

export function OrderProduct(props){
    return <div className='orderProductContainer'>
       <img className='orderProductImgNew' src={props.orderProduct.product.photos[0]}></img>
       <div className='orderProductInfo'>
            <div className='orderProductText'>{props.orderProduct.product.name}</div>
            <div className='orderProductText'>{props.orderProduct.price} ₽ × {props.orderProduct.qty}</div>
            <div className='orderProductText grey'>Подробнее</div>
       </div>
    </div>
}