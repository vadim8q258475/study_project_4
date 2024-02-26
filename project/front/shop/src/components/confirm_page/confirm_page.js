import React, { useEffect, useState } from 'react'
import './confirm_page.css'
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


export function ConfirmPage(props){
    const [isLoaded, setIsLoaded] = useState(true)
    const [items, setItems] = useState([])
    const [cert, setCert] = useState([])
    const [delivery, setDelivery] = useState(true)
    let permissions = useSelector(store => store.permissions)
    let lock_img = 'https://cdn-icons-png.flaticon.com/512/245/245446.png'
    let dash_style = {display: 'inline-block'}
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let total = useSelector(store => store.total)
    let email = useSelector(store => store.promo.email)
    let country = useSelector(store => store.promo.country)
    let name = useSelector(store => store.promo.name)
    let number = useSelector(store => store.promo.number)
    let address = useSelector(store => store.promo.address)
    let city = useSelector(store => store.promo.city)
    let index = useSelector(store => store.promo.index)

    let midValue = useSelector(store => store.promoValue.middleValue)
    let promoValue = useSelector(store => store.promoValue.promo)
    let certificateValue = useSelector(store => store.promoValue.certificate)
    let deliveryPrice = useSelector(store => store.deliveryPrice)
    let oldTotal = useSelector(store => store.firstTotal)

    function checkFunc(id){
        let elem = document.getElementById(id)
        if(elem.style.backgroundColor == 'rgb(255, 126, 47)'){
            elem.style.backgroundColor = 'rgb(238, 236, 236)'
            elem.style.border = '0.5px solid rgb(148, 146, 146);'
        }else{
            elem.style.backgroundColor = '#ff7e2f'
            elem.style.border = '0.5px solid #ff7e2f'
        }    
    }
    function cartClick(){
        let count = 0
        destructLocalStorage().map(elem => {
            let id = `${elem.id}${elem.size}`;
            let prodElem = document.getElementById(id)
            if(prodElem){
                if(prodElem.style.display != 'none'){
                    count+=1
                }
            }
        })
        certificateDestructLocalStorage().map(elem => {
            let id = `${elem.nominal}`;
            let prodElem = document.getElementById(id)
            if(prodElem){
                if(prodElem.style.display != 'none'){
                    count+=1
                }
            }
        })
        if(count == 0){
            document.getElementById('cart1').style.display = 'none'
            document.getElementById('emptyCart1').style.display = 'block'

        }
    }
    function blockFunc(id){
        let elem1 = document.getElementById('block1')
        let elem2 = document.getElementById('block2')

        if(id == 'block1'){
            $.ajax({
                url: 'http://127.0.0.1:8000/update_order',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    field_name: 'deliveryType',
                    field_value: 'Доставка'
                },
                success: (data) => {
                    console.log(data)
                },
                error: (err) => {
                    console.log(err)
                    localStorage.setItem('deliveryType', 'true')
                }
            })
            $.ajax({
                url: 'http://127.0.0.1:8000/update_order',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    field_name: 'deliveryMethod',
                    field_value: 'Курьерская доставка Boxberry'
                },
                success: (data) => {
                    console.log(data)
                },
                error: (err) => {
                    console.log(err)
                    
                }
            })
            setDelivery(true)
            dispatch({type: 'setDelivery', payload: 'true'})
            dispatch({type: 'setDeliveryType', payload: 'Курьерская доставка Boxberry'})
            elem1.style.backgroundColor = 'rgba(255,133,98,0.07)'
            elem1.style.border = '1px solid #ff7e2f'
            elem2.style.backgroundColor = 'white'
            elem2.style.border = '1px solid rgb(174, 169, 169)'
        }else{
            $.ajax({
                url: 'http://127.0.0.1:8000/update_order',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    field_name: 'deliveryType',
                    field_value: 'Самовывоз'
                },
                success: (data) => {
                    console.log(data)
                },
                error: (err) => {
                    console.log(err)
                    localStorage.setItem('deliveryType', 'false')
                }
            })
            $.ajax({
                url: 'http://127.0.0.1:8000/update_order',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    field_name: 'deliveryMethod',
                    field_value: 'Самовывоз в СПБ'
                },
                success: (data) => {
                    console.log(data)
                },
                error: (err) => {
                    console.log(err)
                    
                }
            })
            setDelivery(false)
            dispatch({type: 'setDelivery', payload: 'false'})
            dispatch({type: 'setDeliveryType', payload: 'Самовывоз в СПБ'})
            elem2.style.backgroundColor = 'rgba(255,133,98,0.07)'
            elem2.style.border = '1px solid #ff7e2f'
            elem1.style.backgroundColor = 'white'
            elem1.style.border = '1px solid rgb(174, 169, 169)'
        }
    }
    function submitFunction1(e){
        e.preventDefault()
        let c = 0
        let btn = document.getElementById('cartFakePromoButton12')
        if(name.length==0){
            document.getElementById('err5').style.display = 'inline-block'
            document.getElementById('inputContainer5').style.marginBottom = '0px'
            document.getElementById('inputContainer5').style.border = '2px solid red'
        }else{
            c+=1
        }
        if(number.length==0){
            document.getElementById('err6').style.display = 'inline-block'
            document.getElementById('inputContainer6').style.marginBottom = '0px'
            document.getElementById('inputContainer6').style.border = '2px solid red'
        }else{
            c+=1
        }
        if(address.length==0){
            document.getElementById('err7').style.display = 'inline-block'
            document.getElementById('inputContainer7').style.marginBottom = '0px'
            document.getElementById('inputContainer7').style.border = '2px solid red'
            document.getElementById('inputContainer7').style.width = '763px'
        }else{
            c+=1
        }
        if(city.length==0){
            document.getElementById('err8').style.display = 'inline-block'
            document.getElementById('inputContainer8').style.marginBottom = '0px'
            document.getElementById('inputContainer8').style.border = '2px solid red'
        }else{
            c+=1
        }
        if(index.length!=6){
            document.getElementById('err9').style.display = 'inline-block'
            document.getElementById('inputContainer9').style.marginBottom = '0px'
            document.getElementById('inputContainer9').style.border = '2px solid red'
        }else{
            c+=1
        }
        if(c==5){
            dispatch({type: 'setDeliveryPermission', payload: true})
            navigate('/delivery_page')
        }else{
            btn.animate(
                [
                    { transform: 'translate(-3px, 3px) rotate(0deg)' },
                    { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                    { transform: 'translate(-3px, 0px) rotate(1deg)' },
                    { transform: 'translate(3px, 2px) rotate(0deg)'},
                    { transform: 'translate(1px, -1px) rotate(1deg)'},
                    { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                    { transform: 'translate(-3px, 1px) rotate(0deg)' },
                    { transform: 'translate(3px, 1px) rotate(-1deg)'},
                    { transform: 'translate(-1px, -1px) rotate(1deg)' },
                    { transform: 'translate(1px, 2px) rotate(0deg)' },
                    { transform: 'translate(1px, -2px) rotate(-1deg)' },
                ],
                {
                    iterations: 1,
                    duration: 500,
                }
            )
        }
    }
    function submitFunction2(e){
        let btn = document.getElementById('cartFakePromoButton13')
        e.preventDefault()
        let c = 0;
        if(name.length==0){
            document.getElementById('err5').style.display = 'inline-block'
            document.getElementById('inputContainer5').style.marginBottom = '0px'
            document.getElementById('inputContainer5').style.border = '2px solid red'
        }else{
            c+=1
        }
        if(number.length==0){
            document.getElementById('err6').style.display = 'inline-block'
            document.getElementById('inputContainer6').style.marginBottom = '0px'
            document.getElementById('inputContainer6').style.border = '2px solid red'
        }else{
            c+=1
        }
        if(c==2){
            dispatch({type: 'setDeliveryPermission', payload: true})
            navigate('/delivery_page')
            console.log(store.getState())
        }else{
            btn.animate(
                [
                    { transform: 'translate(-3px, 3px) rotate(0deg)' },
                    { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                    { transform: 'translate(-3px, 0px) rotate(1deg)' },
                    { transform: 'translate(3px, 2px) rotate(0deg)'},
                    { transform: 'translate(1px, -1px) rotate(1deg)'},
                    { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                    { transform: 'translate(-3px, 1px) rotate(0deg)' },
                    { transform: 'translate(3px, 1px) rotate(-1deg)'},
                    { transform: 'translate(-1px, -1px) rotate(1deg)' },
                    { transform: 'translate(1px, 2px) rotate(0deg)' },
                    { transform: 'translate(1px, -2px) rotate(-1deg)' },
                ],
                {
                    iterations: 1,
                    duration: 500,
                }
            )
        }
    }
    function inputGroup(){
        if(delivery){
            return (<div>
            <form>
                <div className='deliverysubHeader'>Все поля обязательны к заполнению, если не указано обратное.</div>
                <div className='confirmInputHeader'>Страна</div>
                <CartInput id={'4'} height={'40px'} width={'764px'} bottom={'16px'} top={'0px'} style={{width: '100%'}}placeholder='Пожалуйста, выберите страну'></CartInput>
             
               
                        <div className='confirmInputHeader'>ФИО (Укажите полностью фамилию и имя)</div>
                        <CartInput id={'5'} height={'40px'} width={'764px'} bottom={'16px'} top={'0px'} placeholder=''></CartInput>
                        <div className='emailErrorMessage' id='err5'>Введите ваше имя и фамилию</div>
                 
                        <div className='confirmInputHeader'>Телефон</div>
                        <CartInput id={'6'} height={'40px'} width={'764px'} bottom={'16px'} top={'0px'} placeholder=''></CartInput>
                        <div className='emailErrorMessage' id='err6'>Введите  номер телефона</div>
               
                <div className='confirmInputHeader'>Адрес</div>
                <CartInput id={'7'} height={'50px'} width={'764px'} bottom={'16px'} top={'0px'} placeholder='Улица, дом, квартира'></CartInput>
                <div className='emailErrorMessage' id='err7'>Пожалуйста, введите адрес</div>
              
                        <CartInput id={'8'} height={'50px'} width={'764px'} bottom={'16px'} top={'0px'} placeholder='Город'></CartInput>
                        <div className='emailErrorMessage' id='err8'>Пожалуйста, укажите город</div>
                   
                        <CartInput id={'9'} height={'50px'} width={'764px'} bottom={'32px'} top={'0px'} placeholder='Индекс (необязательно)'></CartInput>
                        <div className='emailErrorMessage' id='err9'>Введите почтовый индекс</div>
               
                <button className='cartContinueButton' id='cartFakePromoButton12' onClick={submitFunction1}>Продолжить</button>
            </form>
            </div>)
        }else{
            return (<div>
                <form>
                    <div className='deliverysubHeader'>Введите свою контактную информацию:</div>
                    <div className='confirmInputHeader'>ФИО (Укажите полностью фамилию и имя)</div>
                    <CartInput id={'5'} height={'40px'} width={'764px'} bottom={'16px'} top={'0px'} style={{width: '100%'}}></CartInput>
                    <div className='emailErrorMessage' id='err5'>Введите ваше имя и фамилию</div>
                    <div className='confirmInputHeader'>Телефон</div>
                    <CartInput id={'6'} height={'40px'} width={'764px'} bottom={'16px'} top={'0px'} style={{width: '100%'}}></CartInput>
                    <div className='emailErrorMessage' id='err6'>Пожалуйста, введите<br></br> действительный номер телефона</div>
                    <button className='cartContinueButton' id='cartFakePromoButton13' onClick={submitFunction2}>Продолжить</button>
                </form>
            </div>)
        }
    }
    useEffect(()=>{
        $.ajax({
            url: 'http://127.0.0.1:8000/update_order',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                field_name: 'deliveryType',
                field_value: 'Доставка'
            },
            success: (data) => {
                console.log(data)
            },
            error: (err) => {
                console.log(err)
                localStorage.setItem('deliveryType', 'true')
            }
        })
        $.ajax({
            url: 'http://127.0.0.1:8000/update_order',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                field_name: 'deliveryMethod',
                field_value: 'Курьерская доставка Boxberry'
            },
            success: (data) => {
                console.log(data)
            },
            error: (err) => {
                console.log(err)
                
            }
        })
        dispatch({type: 'setDelivery', payload: 'true'})
        dispatch({type: 'setDeliveryType', payload: 'Курьерская доставка Boxberry'})
        if(!permissions.confirm){
            navigate('/cart')
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
                <div onClick={cartClick}>
                <EmptyCart/>
                <div className='cart' id='cart1'>
                    <div className='cartMainContainer1'>
                        <div className='cartMain1'>
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
                                    <div style={{color: '#757575'}}>{email}  <Link to='cart' style={{color: '#757575', textDecoration: 'none'}}><div className='changeField'>Изменить адрес почты</div></Link></div>
                                </div>
                            </div>
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
                            <div className='deliveryHeader'>Доставка</div>
                            <div className='deliverysubHeader'>Выберите, как хотите получить заказ:</div>
                            <div className='deliveryBlocksContainer'>
                                <div className='deliveryBlock' style={{marginRight: '5px', border: '1px solid #ff7e2f', backgroundColor: 'rgba(255,133,98,0.07)'}} id='block1' onClick={()=>{blockFunc('block1')}}>
                                    <div className='deliveryBlockInner'>
                                        <img className='deliveryBlockInnerImg'></img>
                                        <div className='deliveryBlockInnerText'>Доставка по адресу</div>
                                    </div>
                                </div>
                                <div className='deliveryBlock' style={{marginLeft: '5px'}} id='block2' onClick={()=>{blockFunc('block2')}}>
                                    <div className='deliveryBlockInner'>
                                        <img className='deliveryBlockInnerImg'></img>
                                        <div className='deliveryBlockInnerText'>Самовывоз</div>
                                    </div>
                                </div>
                            </div>



                            {inputGroup()}


                            <div className='bigCartText'>Далее</div>
                            <div className='cartText'>
                                Способ доставки<br></br>
                                <div style={{color: '#757575'}}>Выберите, как будете получать свой заказ.</div>
                            </div>
                            <div className='cartText'>
                                Оплата<br></br>
                                <div style={{color: '#757575'}}>Выберите способ оплаты и введите платёжные данные.</div>
                            </div>
                            <div className='cartText'>
                                Подтверждение заказа<br></br>
                                <div style={{color: '#757575'}}>Разместите заказ и получите подтверждение по электронной почте.</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    }
    
}