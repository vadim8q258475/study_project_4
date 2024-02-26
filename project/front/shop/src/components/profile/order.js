import './order.css'
import { OrderProduct } from './order_product'

export function Order(props){
    return <div className='orderContainer'>
        <div className='orderFlexHeader'>
            <div>Заказ 74790</div>
            <div>{props.order.total} ₽</div>
        </div>
        <div className='orderSubHeader'>18-12-2022 12:54</div>
        <div className='paymentAndDeliveryInfo'>
            <div className='paymentInfo'>Оплачен</div>
            <div className='deliveryInfo'>Доставлен</div>
        </div>
        <div className='orderProducts'>
            {props.order.products.map(elem => {
                return <OrderProduct orderProduct={elem}/>
            })}
        </div>
        <div className='orderHeader'>Информация о доставке</div>
        <div className='orderInfoText'>{props.order.name}</div>
        <div className='orderInfoText'>{props.order.deliveryType}: {props.order.index}, {props.order.city} г, {props.order.address}, {props.order.country}</div>
        <div className='orderInfoText'>{props.order.deliveryMethod} (462 ₽)</div>
        <br></br>
        <div className='orderInfoText'> Номер отслеживания: BJA225829922</div>
    </div>
}