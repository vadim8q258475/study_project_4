import React, { useEffect, useState } from 'react'
import './delivery_page.css'
import store from '../../store/redux_main'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import destructLocalStorage from '../../utils/destruct_local_storage'
import $ from 'jquery'
import { EmptyCart } from '../cart/empty_cart'
import CartProduct from '../cart/cart_product'
import CartCertificate from '../cart/cart_certificate'
import certificateDestructLocalStorage from '../../utils/sertificate_destruct_local_storage'
import CartInput from '../../elements/inputs/cart_input'


export function DeliveryPage(props){
    const [isLoaded, setIsLoaded] = useState(true)
    const [items, setItems] = useState([])
    const [cert, setCert] = useState([])
    const dct = {
        '1': 'Курьерская доставка Boxberry',
        '2': 'Почта России: обычная доставка',
        '3': 'Почта России: курьерская доставка',
        '4': 'Бесплатная доставка',
        '5': 'Самовывоз в СПБ',
        '6': 'Самовывоз в МСК',
    }
    let permissions = useSelector(store => store.permissions)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let total = useSelector(store => store.total)
    let delivery = useSelector(store => store.delivery)
    let name = useSelector(store => store.promo.name)
    let address = useSelector(store => store.promo.address)
    let city = useSelector(store => store.promo.city)
    let index = useSelector(store => store.promo.index)
    let country = useSelector(store => store.promo.country)
    let number = useSelector(store => store.promo.number)
    let email = useSelector(store => store.promo.email)
    let deliveryType = useSelector(store => store.deliveryType)

    let midValue = useSelector(store => store.promoValue.middleValue)
    let promoValue = useSelector(store => store.promoValue.promo)
    let certificateValue = useSelector(store => store.promoValue.certificate)
    let deliveryPrice = useSelector(store => store.deliveryPrice)
    let oldTotal = useSelector(store => store.firstTotal)

    function radioFunc(id, s_id){
        let new_s_id
        let new_id

        for(let i = 1; i<7; i++){
            new_s_id = 'sradio' + i.toString()
            new_id = 'radio' + i.toString()
            if(new_id == id){
                document.getElementById(s_id).style.height = '9px'
                document.getElementById(s_id).style.width = '9px'
                document.getElementById(id).style.border = '0.5px solid #ff7e2f'
            }else{
                document.getElementById(new_s_id).style.height = '18px'
                document.getElementById(new_s_id).style.width = '18px'
                document.getElementById(new_id).style.border = '0.5px solid rgb(148, 146, 146)'
            }
        }
    }
    function customerData(){
        if(delivery == 'true'){
            return (
            <div className='emailSuccesContainer'>
                <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                <div className='emailSuccesText'>
                    Адрес доставки<br></br>
                    <div style={{color: '#757575'}}>{name}</div>
                    <div style={{color: '#757575'}}>{address}, {city}, {index}, {country} <Link to='/confirm_page' style={{color: '#757575', textDecoration: 'none'}}><div className='changeField'>Изменить адрес</div></Link></div>
                </div>
            </div>
        )
        }else{
            return (
                <div className='emailSuccesContainer'>
                    <img className='emailSuccesImg' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                    <div className='emailSuccesText'>
                        Контактная информация<br></br>
                        <div style={{color: '#757575'}}>{name}</div>
                        <div style={{color: '#757575'}}>{number} <Link to='/confirm_page' style={{color: '#757575', textDecoration: 'none'}}><div className='changeField'>Изменить контактную информацию</div></Link></div>
                    </div>
                </div>
            )
        }
    }
    function deliveryMethodClick(id){
        dispatch({type: 'setDeliveryType', payload: dct[id]})
        /////////////////////////////////////////////////////////////
        $.ajax({
            url: 'http://127.0.0.1:8000/update_order',
            method: 'post',
            dataType: 'json',
            data: {field_name: 'deliveryMethod', field_value: dct[id]},
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: function(data){
                dispatch({type: 'setConfirm'})
            },  
            error: function(err){
                console.log(err)
                if(true){
                    localStorage.setItem('deliveryMethod', dct[id])
                }
            }
        ////////////////////////////////////////////////////
        })
        let id2 = 'delMet' + id.toString()
        let id1 = 'radio' + id.toString()
        let s_id = 'sradio' + id.toString()
        let elem1 = document.getElementById(id2)
        let elem2;
        let new_id2;
        let new_s_id;
        let new_id;
        for(let i = 1; i<7; i++){
            new_id2 = 'delMet' + i.toString()
            elem2 = document.getElementById(new_id2)
            new_s_id = 'sradio' + i.toString()
            new_id = 'radio' + i.toString()
            if(elem2){
                if(new_id2 == id2){
                    elem1.style.boxShadow = '0 0 0 1px #ff8562'
                    elem1.style.borderLeft = '1px solid #ff8562'
                    elem1.style.borderRight = '1px solid #ff8562'
                    elem1.style.fontWeight = '700'
                    document.getElementById(s_id).style.height = '9px'
                    document.getElementById(s_id).style.width = '9px'
                    document.getElementById(id1).style.border = '0.5px solid #ff7e2f'
                }else{
                    elem2.style.boxShadow = '0 -1px 0 0 #e6e6e6'
                    elem2.style.borderLeft = '1px solid #e6e6e6'
                    elem2.style.borderRight = '1px solid #e6e6e6'
                    elem2.style.fontWeight = '500'
                    document.getElementById(new_s_id).style.height = '18px'
                    document.getElementById(new_s_id).style.width = '18px'
                    document.getElementById(new_id).style.border = '0.5px solid rgb(148, 146, 146)'
                }
            }
        }

    }
    function deliveryTypeSwap(){
        if(localStorage.getItem('deliveryType')=='true'){
            return (<div><div className='deliveryHeader'>Способ доставки</div>
            <div className='deliverysubHeader'>Выберите способ доставки:</div>
           
            <div className='deliveryMethodContainer'>
                <div className='deliveryMethod activeBlock' id='delMet1' onClick={() => deliveryMethodClick('1')}>
                    <div className='searchRadioContainer'>
                        <div className='searchRadio searchRadioNoHover activeRadio' id='radio1' style={{marginRight: '21px', marginLeft: '21px'}}><div className='smallSearchRadio activeSmallRadio' id='sradio1'></div></div><div className='searchRadioText'>Курьерская доставка Boxberry</div>
                    </div>
                    <div className='deliveryMethodText'>552₽</div>
                </div>
                <div className='deliveryMethod' id='delMet2' onClick={() => deliveryMethodClick('2')}>
                    <div className='searchRadioContainer'>
                        <div className='searchRadio searchRadioNoHover' id='radio2' style={{marginRight: '21px', marginLeft: '21px'}}><div className='smallSearchRadio' id='sradio2'></div></div><div className='searchRadioText'>Почта России: обычная доставка</div>
                    </div>
                    <div className='deliveryMethodText'>321₽</div>
                </div>
                <div className='deliveryMethod' id='delMet3' onClick={() => deliveryMethodClick('3')}>
                    <div className='searchRadioContainer'>
                        <div className='searchRadio searchRadioNoHover' id='radio3' style={{marginRight: '21px', marginLeft: '21px'}}><div className='smallSearchRadio' id='sradio3'></div></div><div className='searchRadioText'>Почта России: курьерская доставка (EMS)</div>
                    </div>
                    <div className='deliveryMethodText'>543₽</div>
                </div>

                <div className='deliveryMethod lastDeliveryMethod' id='delMet4' onClick={() => deliveryMethodClick('4')}>
                    <div className='searchRadioContainer'>
                        <div className='searchRadio searchRadioNoHover' id='radio4' style={{marginRight: '21px', marginLeft: '21px'}}><div className='smallSearchRadio' id='sradio4'></div></div><div className='searchRadioText'>Бесплатная доставка</div>
                    </div>
                    <div className='deliveryMethodText'>Бесплатно</div>
                </div>
           
            </div></div>)
        }else{
            return (<div>
            <div className='deliveryHeader'>Самовывоз</div>
           
            <div className='deliveryMethodContainer'>
                <div className='deliveryMethod activeBlock' id='delMet5' onClick={() => deliveryMethodClick('5')}>
                    <div className='searchRadioContainer'>
                        <div className='searchRadio searchRadioNoHover activeRadio' id='radio5' style={{marginRight: '21px', marginLeft: '21px'}}><div className='smallSearchRadio activeSmallRadio' id='sradio5'></div></div><div className='searchRadioText'>Самовывоз в СПБ</div>
                    </div>
                </div>
                <div className='deliveryMethod lastDeliveryMethod' id='delMet6' onClick={() => deliveryMethodClick('6')}>
                    <div className='searchRadioContainer'>
                        <div className='searchRadio searchRadioNoHover' id='radio6' style={{marginRight: '21px', marginLeft: '21px'}}><div className='smallSearchRadio' id='sradio6'></div></div><div className='searchRadioText'>Самовывоз в МСК</div>
                    </div>
                </div>
            </div>
            <div className='deliverysubHeader'>Обратите внимание, что не все товары могут быть в наличии, часть ассортимента оформляется по предзаказу!</div>
            <br></br>
            <div className='deliverysubHeader'>По готовности заказа, мы свяжемся с вами для уточнения деталей.</div>
            <br></br>
            <div className='deliverysubHeader'>Где забрать заказ:</div>
            <div className='deliverysubHeader'>Санкт-Петербург, Лиговский пр-т 74, лофт-проект "ЭТАЖИ", второй двор</div>
            <div className='deliverysubHeader'>График работы магазина:</div>
            <div className='deliverysubHeader'>ПН-ВС с 11:00 до 21.00</div>
            <br></br>
            </div>)
        }
    }
    function btnFunc(){
        dispatch({type: 'setPayment', payload: ''})
        navigate('/payment_page')
       
    }
    useEffect(()=>{
        
        if(!permissions.delivery){
            if(!permissions.confirm){
                navigate('/cart')
            }else{
                navigate('/confirm')
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
                if(localStorage.getItem('deliveryType')=='true'){
                    deliveryMethodClick('1')
                }else{
                    deliveryMethodClick('5')
                }
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
                                    <div style={{color: '#757575'}}>{email}<Link to='/cart' style={{color: '#757575', textDecoration: 'none'}}><div className='changeField'>Изменить адрес почты</div></Link></div>
                                </div>
                            </div>
                            {customerData()}
                            <hr></hr>
                            <div className='confirmPageText'>
                                В связи со сложившийся геополитической ситуацией, мы временно не можем обработать заказы на территории Украины! Просим прощения за доставленные неудобства
                                <br></br>
                                <br></br>
                                <br></br>
                                Способ доставки не влияет на сроки обработки заказа! Обратите внимание, что часть товаров в статусе предзаказа!
                                <br></br>
                                <br></br>
                                <div style={{color: '#757575'}}>The shipping method does not affect the processing time of the order! Please note that some of the products are in pre-order status!</div>
                                <br></br>
                                <br></br>
                                При заполнении полей адреса и ФИО, указывайте полные данные для почтовых служб
                                <br></br>
                                <br></br>
                                <div style={{color: '#757575'}}>When filling in the address and full name fields, indicate complete data for postal services</div>
                            </div>
             
                           
                            {deliveryTypeSwap()}
                            

                            <button className='cartContinueButton' id='cartFakePromoButton41' onClick={btnFunc}>Продолжить</button>
                            <div className='bigCartText'>Далее</div>
                     
                            <div className='cartText'>
                                Оплата<br></br>
                                <div style={{color: '#757575'}}>Выберите способ оплаты и введите платёжные данные.</div>
                            </div>
                    
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    }
    
}