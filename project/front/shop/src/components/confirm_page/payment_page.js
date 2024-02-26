import React, { useEffect, useState } from 'react'
import './payment_page.css'
import store from '../../store/redux_main'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import destructLocalStorage from '../../utils/destruct_local_storage'
import $, { ajax } from 'jquery'
import { EmptyCart } from '../cart/empty_cart'
import CartProduct from '../cart/cart_product'
import CartCertificate from '../cart/cart_certificate'
import certificateDestructLocalStorage from '../../utils/sertificate_destruct_local_storage'
import CartInput from '../../elements/inputs/cart_input'


export function PaymentPage(props){
    const [isLoaded, setIsLoaded] = useState(true)
    const [items, setItems] = useState([])

    let dispatch = useDispatch()
    let total = useSelector(store => store.total)
    let navigate = useNavigate()
    let permissions = useSelector(store => store.permissions)

    let delivery = useSelector(store => store.delivery)
    let name = useSelector(store => store.promo.name)
    let address = useSelector(store => store.promo.address)
    let city = useSelector(store => store.promo.city)
    let index = useSelector(store => store.promo.index)
    let country = useSelector(store => store.promo.country)
    let number = useSelector(store => store.promo.number)
    let email = useSelector(store => store.promo.email)
    let deliveryType = useSelector(store => store.deliveryType)
    let oldTotal = useSelector(store => store.firstTotal)
    let promo = useSelector(store => store.promo.promo) 
    let certificate = useSelector(store => store.promo.certificate) 

    let midValue = useSelector(store => store.promoValue.middleValue)
    let promoValue = useSelector(store => store.promoValue.promo)
    let certificateValue = useSelector(store => store.promoValue.certificate)
    let deliveryPrice = useSelector(store => store.deliveryPrice)

    function customerData(){
        if(delivery){
            return (
            <div>
                <div className='emailSuccesContainer'>
                    <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                    <div className='emailSuccesText'>
                        Адрес доставки<br></br>
                        <div style={{color: '#757575'}}>{name}</div>
                        <div style={{color: '#757575'}}>{address}, {city}, {index}, {country}<Link to='confirm_page' style={{color: '#757575', textDecoration: 'none', marginLeft: '8px'}}><div className='changeField'>Изменить адрес</div></Link></div>
                    </div>
                </div>
                <div className='emailSuccesContainer'>
                    <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                    <div className='emailSuccesText'>
                        Способ доставки<br></br>
                        <div style={{color: '#757575'}}>{deliveryType}<Link to='delivery_page' style={{color: '#757575', textDecoration: 'none', marginLeft: '8px'}}><div className='changeField'>Изменить способ доставки</div></Link></div>
                    </div>
                </div>
            </div>
        )
        }else{
            return (
            <div>
                <div className='emailSuccesContainer'>
                    <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                    <div className='emailSuccesText'>
                        Контактная информация<br></br>
                        <div style={{color: '#757575'}}>{name}</div>
                        <div style={{color: '#757575'}}>{number}<Link to='confirm_page' style={{color: '#757575', textDecoration: 'none', marginLeft: '8px'}}><div className='changeField'>Изменить адрес</div></Link></div>
                    </div>
                </div>
                <div className='emailSuccesContainer'>
                    <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                    <div className='emailSuccesText'>
                        Информация о самовывозе<br></br>
                        <div style={{color: '#757575'}}>{deliveryType}<Link to='delivery_page' style={{color: '#757575', textDecoration: 'none', marginLeft: '8px'}}><div className='changeField'>Изменить способ доставки</div></Link></div>
                    </div>
                </div>
            </div>
            )
        }
    }


    function paymentClick(){
        ////
        $.ajax({
            url: 'http://127.0.0.1:8000/confirm_order',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: function(data){
                console.log(data)
                for(let i=0; i<localStorage.length; i++) {
                    let key = localStorage.key(i);
                    if(key!='token' && key!='username' && key!='email' && key!='password'){
                        localStorage.removeItem(key)
                        console.log(key)
                    }
                }
            },
            error: function(data){
                let arr = destructLocalStorage()
                let id_arr = ''
                let size_arr = ''
                let qty_arr = ''
                for(let i = 0; i<arr.length; i++){
                    id_arr+=' '+arr[i].id.toString()
                    size_arr+=' '+arr[i].size
                    qty_arr+=' '+arr[i].qty.toString()
                }
                let cert_arr = certificateDestructLocalStorage()
                let nominal_arr = ''
                let cert_qty_arr = ''
                for(let i = 0; i<cert_arr.length; i++){
                    nominal_arr+=' '+cert_arr[i].nominal.toString()
                    cert_qty_arr+=' '+cert_arr[i].qty.toString()
                }
                console.log(destructLocalStorage())
                let deliveryMethod;
                if(delivery){
                    deliveryMethod = 'Доставка'
                }else{
                    deliveryMethod = 'Самовывоз'
                }
                $.ajax({
                    url: 'http://127.0.0.1:8000/order_creation',
                    data: {
                        nominals: nominal_arr,
                        cert_qtys: cert_qty_arr,
                        ids: id_arr,
                        sizes: size_arr,
                        qtys: qty_arr,
                        email: email,
                        country: country,
                        name: name,
                        number: number,
                        address: address,
                        city: city,
                        index: index,
                        delivery_type: deliveryMethod,
                        delivery_method: deliveryType,
                        total: total,
                        old_total: oldTotal,
                        certificate: certificate,
                        promo: promo
                    },
                    method: 'post',
                    dataType: 'json',
                    success: function(data){
                        console.log(data)
                    },
                }); 
                dispatch({type: 'delConfirm'})
                dispatch({type: 'delDeliveryPermission'})
                dispatch({type: 'delPayment'})
                dispatch({type: 'setCartQty', payload: 0})
                navigate('/main')
                localStorage.clear()
            }
        });
    }
    useEffect(()=>{
        if(!permissions.payment){
            if(!permissions.delivery){
                if(!permissions.confirm){
                    navigate('/cart')
                }else{
                    navigate('/confirm')
                }
            }else{
                navigate('/delivery')
            }
        }
        let prodArr = []
        for(let i = 0; i<destructLocalStorage().length; i++){
            prodArr.push(destructLocalStorage()[i].id)
        }
        console.log(prodArr.join(' '))

        let arr = destructLocalStorage()
        let id_arr = ''
        for(let i = 0; i<arr.length; i++){
            id_arr+=' '+arr[i].id.toString()
        }
        console.log(id_arr)
        $.ajax({
            url: 'http://127.0.0.1:8000/cart_product',
            method: 'post',
            dataType: 'json',
            data: { 
               'id_arr': id_arr 
            },
            success: function(data){
                let total = 0
                for(let i = 0; i<data.length; i++){
                    let prod = data[i]
                    arr[i].product = prod
                    total += prod.price * arr[i].qty
                }
                setItems(arr)
                let cert = certificateDestructLocalStorage()
                for(let i = 0; i<cert.length; i++){
                    total+=cert[i].nominal
                }
                //dispatch({type: 'setTotal', payload: total})
                setIsLoaded(true)
            },
        });
    }, [])
    if(!isLoaded){
        return (<div>Loading...</div>)
    }else{
        if(items.length == 0 && certificateDestructLocalStorage().length == 0){
            return <EmptyCart display = 'block'/>
        }else{
            return (
                <div>
                <EmptyCart/>
                <div className='cart' id='cart1'>
                    <div className='cartMainContainer1'>
                        <div className='cartMain1' >
                            <div className='cartHeader'>Карзина</div>
                            <div className='cartPath'>Вернуться в каталог</div>
                            <div className='cartProducts' id='cartProducts1'>
                            {items.map(elem => {
                                return <CartProduct product={elem.product} size={elem.size} qty={elem.qty} confirm={true}></CartProduct>
                            })}
                            {certificateDestructLocalStorage().map(elem => {
                                return <CartCertificate nominal={elem.nominal} qty={elem.qty} confirm={true}></CartCertificate>
                            })}
                            </div>
                            <hr></hr>
                            <div className='smallFlexTotal' id='smallFlexTotal1'>
                                <div className='smallTotalText'>Товары</div>
                                <div>
                                    <div className='smallTotalText'>{oldTotal} ₽</div>
                                </div>
                            </div>
                            <div className='smallFlexTotal' id='smallFlexTotal2'>
                                <div className='smallTotalText'>Скидка по купону(-{promoValue}%)</div>
                                <div>
                                    <div className='smallTotalText'>{midValue} ₽</div>
                                </div>
                            </div>
                            <div className='smallFlexTotal' id='smallFlexTotal3'>
                                <div className='smallTotalText'>Подарочный сертификат (-{certificateValue} ₽)</div>
                                <div>
                                    <div className='smallTotalText'>{total} ₽</div>
                                </div>
                            </div>
                            <div className='smallFlexTotal' id='smallFlexTotal4'>
                                <div className='smallTotalText'>Доставка</div>
                                <div>
                                    <div className='smallTotalText'>{deliveryPrice} ₽</div>
                                </div>
                            </div>
                            <div className='flexTotal'>
                                <div className='totalText'>Итого</div>
                                <div className='totalText'>{total}</div>
                            </div>
                        </div>
                        <div className='cartAside'>
                            <div className='cartHeader'>Оформление заказа</div>
                            <div className='emailSuccesContainer'>
                                <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                                <div className='emailSuccesText'>
                                    Адрес эл. почты<br></br>
                                    <div style={{color: '#757575'}}>{email}<Link to='cart' style={{color: '#757575', textDecoration: 'none'}}><div className='changeField'>Изменить адрес почты</div></Link></div>
                                </div>
                            </div>
                            {customerData()}
                            <hr></hr>
                            <div className='deliveryHeader' style={{marginBottom:'20px'}}>Оплата</div>
                            <div className='deliveryMethodContainer'>
                                <div className='deliveryMethod activeMethod'>
                                    <div className='searchRadioContainer'>
                                        <div className='searchRadio searchRadioNoHover' style={{marginRight: '21px', marginLeft: '21px', border:'0.5px solid #ff8562'}}><div className='smallSearchRadio smallRadioAcive' id='sradio1'></div></div><div className='searchRadioText'>Онлайн оплата / СБП</div>
                                    </div>
                                    <div className='paymentImgGroup'>
                                        <img className='paymentImg' src='https://ru-cdn-services.ecwid.net/node/static/2023/2023-55396-g8c7f1bfe1daebc/icons/mastercard.svg'></img>
                                        <img className='paymentImg' src='https://ru-cdn-services.ecwid.net/node/static/2023/2023-55396-g8c7f1bfe1daebc/icons/visa.svg'></img>
                                        <img className='paymentImg' src='https://ru-cdn-services.ecwid.net/node/static/2023/2023-55396-g8c7f1bfe1daebc/icons/mir.svg'></img>
                                        <img className='paymentImg' src='https://ru-cdn-services.ecwid.net/node/static/2023/2023-55396-g8c7f1bfe1daebc/icons/sberbank.svg'></img>
                                    </div>
                                </div>
                            </div>
    


                            <div className='deliveryHeader' style={{fontSize: '14px'}}>Платёжный адрес совпадает с адресом доставки</div>
                         
                              
                                <div style={{color: '#757575', fontSize: '12px'}}>{name}</div>
                                <div style={{color: '#757575', fontSize: '12px', marginBottom: '20px'}}>{address}<br></br> <Link to='confirm_page' style={{color: '#757575', textDecoration: 'none'}}>Изменить адрес</Link></div>
                              
                    


                            <div className='deliveryHeader' style={{fontSize: '14px'}}>Комментарий к заказу</div>
                            <CartInput id={'10'} height={'80px'} width={'764px'} bottom={'16px'} top={'0px'} style={{width: '100%'}}></CartInput>

                            <button className='cartContinueButton' onClick={paymentClick}>Перейти к оплате</button>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    }
    
}