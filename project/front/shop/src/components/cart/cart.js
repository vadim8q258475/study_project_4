import React, { useEffect, useState } from 'react'
import './cart.css'
import CartProduct from './cart_product'
import CartInput from '../../elements/inputs/cart_input'
import store from '../../store/redux_main'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Item from '../item/item'
import destructLocalStorage from '../../utils/destruct_local_storage'
import { extend } from 'jquery'
import $ from 'jquery'
import { EmptyCart } from './empty_cart'
import certificateDestructLocalStorage from '../../utils/sertificate_destruct_local_storage'
import CartCertificate from './cart_certificate'


function NewCart(props){
    const [isLoaded, setIsLoaded] = useState(true)
    const [items, setItems] = useState([])
    const [cert, setCert] = useState([])
    const [conf, setConf] = useState(false)
    const [recItems, setRecItems] = useState([])
    let lock_img = 'https://cdn-icons-png.flaticon.com/512/245/245446.png'
    let dash_style = {display: 'inline-block', marginLeft: '10px', marginRight: '10px'}
    let dispatch = useDispatch()
    let total = useSelector(store => store.total)
    let oldTotal = useSelector(store => store.firstTotal)
    let email = useSelector(store => store.promo.email)
    let promo = useSelector(store => store.promo.promo) 

    let midValue = useSelector(store => store.promoValue.middleValue)
    let promoValue = useSelector(store => store.promoValue.promo)
    let certificateValue = useSelector(store => store.promoValue.certificate)
    let deliveryPrice = useSelector(store => store.deliveryPrice)

    let certificate = useSelector(store => store.promo.certificate) 
    const navigate = useNavigate()
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
        'comment': 'updateComment',
        'deliveryType': 'setDelivery',
        'deliveryMethod': 'setDeliveryType', //userOrder

        'total': 'setTotal',
        'midTotal': 'setMiddleValue',
        'oldTotal': 'setFirstTotal',
        'certValue': 'setCertValue',
        'promoValue': 'setPromoValue',
        'confirmCheck': 'setConfirmCheck',
        'deliveryPrice': 'setDeliveryPrice', //cart

        'password': 'setPassword',
        'login': 'setLogin',
    }

    let priceElem1 = document.getElementById('smallFlexTotal1')
    let priceElem2 = document.getElementById('smallFlexTotal2')
    let priceElem3 = document.getElementById('smallFlexTotal3')

    function checkFunc(id){
        if(id == 'cartCheck1'){
            setConf(!conf)
            if(localStorage.getItem('confirmCheck') == 'false'){
                dispatch({type: 'setConfirmCheck', payload: 'true'})
                localStorage.setItem('confirmCheck', 'true')
            }else{
                dispatch({type: 'setConfirmCheck', payload: 'false'})
                localStorage.setItem('confirmCheck', 'false')
            }
        }
        let elem = document.getElementById(id)
        if(elem.style.backgroundColor == 'rgb(255, 126, 47)'){
            elem.style.backgroundColor = 'rgb(238, 236, 236)'
            elem.style.border = '0.5px solid rgb(148, 146, 146);'
        }else{
            elem.style.backgroundColor = '#ff7e2f'
            elem.style.border = '0.5px solid #ff7e2f'
        }   
        console.log(localStorage.getItem('confirmCheck')) 
    }
    function cartClick(){
         // ----------------------------------------- //
        console.log(localStorage)
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
        items.map((elem) => {
            let id = `${elem.id}${elem.size}`;
            let prodElem = document.getElementById(id)
            if(prodElem){
                if(prodElem.style.display != 'none'){
                    count+=1
                }
            }
        })
        if(count == 0){
            //document.getElementById('cart1').style.display = 'none'
            //document.getElementById('emptyCart1').style.display = 'block'

        }
         // ----------------------------------------- //
    }
    function cartSubmit(e){
        e.preventDefault()
        console.log(email)
        let btn = document.getElementById('cartFakePromoButton10')
        let elem = document.getElementById('cartCheck1').style.backgroundColor
         // ----------------------------------------- //
        if(!conf || email.length == 0 ){
            console.log(email)
            console.log(conf)
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
        }else{
            $.ajax({
                url: 'http://127.0.0.1:8000/create_order',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                success: function(data){
                    console.log(data)
                    dispatch({type: 'setConfirm'})
                    navigate('/confirm_page')
                },  
                error: function(err){
                    console.log(err)
                    if(true){
                        $.ajax({
                            url: 'http://127.0.0.1:8000/email_validator',
                            method: 'post',
                            dataType: 'json',
                            data: {email: email},
                            success: function(data){
                                if(data){
                                    dispatch({type: 'setConfirm'})
                                    navigate('/confirm_page')
                                }else{
                                    let el = document.getElementById('inputContainer3')
                                    el.style.border = '2px solid red'
                                    el.style.marginBottom = '0px'
                                    document.getElementsByClassName('emailErrorMessage')[0].style.display = 'block'
                                }
                            },  
                        })
                    }
                }
            })
             // ----------------------------------------- //
            //navigate('/confirm_page')
        }
    }
    function promoSubmit(e){
        console.log(promo, certificate)
        e.preventDefault()
        let add_text = document.getElementById('detailBtnText1')
        let del_text = document.getElementById('detailBtnText11')
         // ----------------------------------------- //
        if(add_text.style.display == 'none'){
            $.ajax({
                url: 'http://127.0.0.1:8000/delete_promo',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    promo_code: promo
                },
                success: function(data){
                    console.log(data)
                    dispatch({type: 'updatePromo', payload: ''})
                    del_text.style.display = 'none'
                    add_text.style.display = 'block'
                    $.ajax({
                        url: 'http://127.0.0.1:8000/get_cart_info',
                        method: 'get',
                        dataType: 'json',
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        },
                        success: function(data){
                            dispatch({type: 'updatePromo', payload: ''})
                            console.log(data.promo)
                            for(let key in data){
                                console.log(key)
                                if(key_dct[key]){
                                    dispatch({type: key_dct[key], payload: data[key]})
                                }
                            }
                            dispatch({type: 'setPromoValue', payload: data.promoValue})
                            dispatch({type: 'setMiddleValue', payload: data.midValue})
                            dispatch({type: 'setCertValue', payload: data.certValue})
                        },
                        error: function(err){
                            console.log(err)
                        }
                        
                    })
                },
                error: function(err){
                    console.log(err)
                    if(true){
                        dispatch({type: 'updatePromo', payload: ''})
                        localStorage.setItem('promo', '')
                        del_text.style.display = 'none'
                        add_text.style.display = 'block'
                        $.ajax({
                            url: 'http://127.0.0.1:8000/cert_and_promo_validate',
                            method: 'post',
                            dataType: 'json',
                            data: {
                                promo: '',
                                certificate: certificate,
                                total: oldTotal
                            },
                            success: function(data){
                                document.getElementById('detailBtnText1').style.display = 'block'
                                document.getElementById('detailBtnText11').style.display = 'none'
                                dispatch({type: 'setTotal', payload: parseInt(data['total'])})
                                localStorage.setItem('total', parseInt(data['total']))
                                document.getElementById('smallFlexTotal2').style.display = 'none'
                                if(data['certificate']==0 && oldTotal == total){
                                    document.getElementById('smallFlexTotal1').style.display = 'none'
                                }  
                            },   
                        }) 
                    }
                }
            })
        }else{
            $.ajax({
                url: 'http://127.0.0.1:8000/add_promo',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    promo_code: promo
                },
                success: function(data){
                    console.log(data)
                    console.log(promo)
                    $.ajax({
                        url: 'http://127.0.0.1:8000/get_cart_info',
                        method: 'get',
                        dataType: 'json',
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        },
                        success: function(data){
                            console.log(data, 'dfdf')
                            for(let key in data){
                                if(key_dct[key]){
                                    dispatch({type: key_dct[key], payload: data[key]})
                                }   
                            }
                            /*if(data){
                                let elem = document.getElementById('inputContainer1')
                                elem.style.border = '1px solid #e56363'
                                elem.style.boxShadow = '0 0 0 1px #e56363 inset'
                                elem.style.marginBottom = '0px'
                                document.getElementById('err1').style.display = 'block'
                            }else{}*/
                            document.getElementById('smallFlexTotal1').style.display = 'flex'
                            document.getElementById('smallFlexTotal2').style.display = 'flex'
                            document.getElementById('detailBtnText1').style.display = 'none'
                            document.getElementById('detailBtnText11').style.display = 'block'
                            
                        }
                        
                    })
                },
                error: function(err){
                    console.log(err)
                    if(true){
                        $.ajax({
                            url: 'http://127.0.0.1:8000/cert_and_promo_validate',
                            method: 'post',
                            dataType: 'json',
                            data: {
                                promo: promo,
                                certificate: certificate,
                                total: oldTotal
                            },
                            success: function(data){
                                if(data.promo == 0){
                                    let elem = document.getElementById('inputContainer1')
                                    elem.style.border = '1px solid #e56363'
                                    elem.style.boxShadow = '0 0 0 1px #e56363 inset'
                                    elem.style.marginBottom = '0px'
                                    document.getElementById('err1').style.display = 'block'
                                }else{
                                    dispatch({type: 'setTotal', payload: parseInt(data['total'])})
                                    localStorage.setItem('total', data['total'])
                                    let percent = data['promo']
                                    let mid = oldTotal - ((oldTotal/100)*percent)
                                    let cert = mid - data['total']
                                    dispatch({type: 'setPromoValue', payload: percent})
                                    dispatch({type: 'setMiddleValue', payload: mid})
                                    dispatch({type: 'setCertValue', payload: cert})
                                    localStorage.setItem('promoValue', percent)
                                    localStorage.setItem('midTotal', mid)
                                    localStorage.setItem('certValue', cert)
                                    document.getElementById('smallFlexTotal1').style.display = 'flex'
                                    document.getElementById('smallFlexTotal2').style.display = 'flex'
                                    console.log(certificateValue, midValue, percent)
                                    document.getElementById('detailBtnText1').style.display = 'none'
                                    document.getElementById('detailBtnText11').style.display = 'block'
                                }
                                
                            },   
                        })
                    }
                }
            }) 
        }
         // ----------------------------------------- //
    }
    function certSubmit(e){
        console.log(promo, certificate)
        e.preventDefault()
        let add_text = document.getElementById('detailBtnText2')
        let del_text = document.getElementById('detailBtnText22')
        // ----------------------------------------- //
        if(add_text.style.display == 'none'){
            dispatch({type: 'updateCertificate', payload: ''})
            localStorage.setItem('certificate', '')
            del_text.style.display = 'none'
            add_text.style.display = 'block'
            $.ajax({
                url: 'http://127.0.0.1:8000/cert_and_promo_validate',
                method: 'post',
                dataType: 'json',
                
                data: {
                    promo: promo,
                    certificate: '',
                    total: oldTotal
                },
                success: function(data){
                    add_text.style.display = 'block'
                    del_text.style.display = 'none'
                    dispatch({type: 'setTotal', payload: parseInt(data['total'])})
                    localStorage.setItem('total', data['total'])
                    document.getElementById('smallFlexTotal3').style.display = 'none'
                    if(data['promo']==0){
                        document.getElementById('smallFlexTotal2').style.display = 'none'
                    }  
                },   
            }) 
        }else{
            $.ajax({
                url: 'http://127.0.0.1:8000/add_certificate',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    certificate_code: certificate
                },
                success: function(data){
                    console.log(data)
                    $.ajax({
                        url: 'http://127.0.0.1:8000/get_cart_info',
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        },
                        method: 'get',
                        dataType: 'json',
                        success: function(data){
                            console.log(data)
                            for(let key in data){
                                if(key_dct[key]){
                                    dispatch({type: key_dct[key], payload: data[key]})
                                }
                            }
                            if(data.certValue == 0 && (data.total == data.oldTotal || data.total == data.midValue)){
                                let elem = document.getElementById('inputContainer2')
                                elem.style.border = '1px solid #e56363'
                                elem.style.boxShadow = '0 0 0 1px #e56363 inset'
                                elem.style.marginBottom = '0px'
                                document.getElementById('err2').style.display = 'block'
                            }else{
                                dispatch({type: 'setPromoValue', payload: data.promoValue})
                                dispatch({type: 'setMiddleValue', payload: data.midValue})
                                dispatch({type: 'setCertValue', payload: data.certValue})
                                document.getElementById('smallFlexTotal1').style.display = 'flex'
                                document.getElementById('smallFlexTotal3').style.display = 'flex'
                                document.getElementById('detailBtnText2').style.display = 'none'
                                document.getElementById('detailBtnText22').style.display = 'block'
                            }
                        }
                    })
                },
                error: function(err){
                    console.log(err)
                    if(true){
                        $.ajax({
                            url: 'http://127.0.0.1:8000/cert_and_promo_validate',
                            method: 'post',
                            dataType: 'json',
                            data: {
                                promo: promo,
                                certificate: certificate,
                                total: oldTotal
                            },
                            success: function(data){
                                console.log(data)
                                if(data.certificate == 0 && (data.total == oldTotal || data.total == midValue)){
                                    let elem = document.getElementById('inputContainer2')
                                    elem.style.border = '1px solid #e56363'
                                    elem.style.boxShadow = '0 0 0 1px #e56363 inset'
                                    elem.style.marginBottom = '0px'
                                    document.getElementById('err2').style.display = 'block'
                                }else{
                                    dispatch({type: 'setTotal', payload: parseInt(data['total'])})
                                    localStorage.setItem('total', data['total'])
                                    let percent = data['promo']
                                    let mid = oldTotal - ((oldTotal/100)*percent)
                                    let cert = mid - data['total']
                                    dispatch({type: 'setPromoValue', payload: percent})
                                    dispatch({type: 'setMiddleValue', payload: mid})
                                    dispatch({type: 'setCertValue', payload: cert})
                                    localStorage.setItem('promoValue', percent)
                                    localStorage.setItem('midTotal', mid)
                                    localStorage.setItem('certValue', cert)
                                    document.getElementById('smallFlexTotal1').style.display = 'flex'
                                    document.getElementById('smallFlexTotal3').style.display = 'flex'
                                    document.getElementById('detailBtnText2').style.display = 'none'
                                    document.getElementById('detailBtnText22').style.display = 'block'
                                }
                            },   
                        }) 
                    }
                }
            })
        }
        // ----------------------------------------- //
    }
    useEffect(()=>{
        /*if(localStorage.getItem('confirmCheck') == 'true'){
            let elem23 = document.getElementById('cartCheck1')
            elem23.style.backgroundColor = '#ff7e2f'
            elem23.style.border = '0.5px solid #ff7e2f'
        }*/
    
        // ----------------------------------------- //
        console.log(localStorage)
        let prodArr = []
        for(let i = 0; i<destructLocalStorage().length; i++){
            prodArr.push(destructLocalStorage()[i].id)
        }
        console.log(prodArr.join(' '))
        $.ajax({
            url: 'http://127.0.0.1:8000/create_rec',
            method: 'post',
            dataType: 'json',
            data: {product_id: prodArr.join(' ')},
            success: function(data){
                setRecItems(data)
                console.log(data)
            },   
        })
        // ----------------------------------------- //

        // ----------------------------------------- //
        $.ajax({
            url: 'http://127.0.0.1:8000/get_cart_info',
            method: 'get',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: function(data){
                console.log(data)
                console.log(data.products)
                setItems(data.products)
                dispatch({type: 'setTotal', payload: data.total})
                dispatch({type: 'setFirstTotal', payload: data.total})
                setIsLoaded(true)
            },
            error: function(data){
                dispatch({type: 'setCertValue', payload: Number(localStorage.getItem('certValue'))})
                dispatch({type: 'setMiddleValue', payload: Number(localStorage.getItem('midTotal'))})
                dispatch({type: 'setPromoValue', payload: Number(localStorage.getItem('promoValue'))})
                dispatch({type: 'setTotal', payload: Number(localStorage.getItem('total'))})
                
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
                        dispatch({type: 'setTotal', payload: total})
                        dispatch({type: 'setFirstTotal', payload: total})
                        setIsLoaded(true)
                    },
                }); 
            },
        });
        // ----------------------------------------- //
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
                    <div className='cartMainContainer'>

                        <div className='cartMain'>
                            <div className='cartHeader'>Карзина</div>
                            <div className='cartPath'>Магазин <div style={dash_style}>/</div> Корзина</div>
                            <div className='cartProducts' id='cartProducts1'>
                            {items.map(elem => {
                                return <CartProduct product={elem.product} size={elem.size} qty={elem.qty} ></CartProduct>
                            })}
                            {certificateDestructLocalStorage().map(elem => {
                                return <CartCertificate nominal={elem.nominal} qty={elem.qty} ></CartCertificate>
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
                                <div>
                                    <div className='totalText'>{total} ₽</div>
                                </div>
                            </div>
                        
                                <form className='cartPromoInputContainer' onSubmit={promoSubmit}>
                                    <CartInput id={'1'} height={'40px'} width={'100%'} bottom={'5px'} top={'0px'} placeholder='Введите промокод' />
                                    <button className='cartFakePromoButton' id='cartFakePromoButton1'>
                                        <div id='detailBtnText1'>Применить</div>
                                        <div id='detailBtnText11' style={{display:'none'}}>Отменить</div>
                                        <img className='btnImgSuc' id='btnImgSuc1' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                                    </button>
                                </form>
                                <div className='emailErrorMessage' id='err1'>Неверный код</div>
                        
                          
                                <form className='cartPromoInputContainer' onSubmit={certSubmit}>
                                    <CartInput id={'2'} height={'40px'} width={'100%'} bottom={'16px'} top={'0px'} placeholder='Введите код сертификата'/>
                                    <button className='cartFakePromoButton' id='cartFakePromoButton2'>
                                        <div id='detailBtnText2'>Применить</div>
                                        <div id='detailBtnText22' style={{display:'none'}}>Отменить</div>
                                        <img className='btnImgSuc' id='btnImgSuc2' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                                    </button>
                                    
                                </form>   
                                <div className='emailErrorMessage' id='err2'>С введённым адресом что-то не так. Пожалуйста, убедитесь, что ввели электронный адрес правильно.</div>
                         
                          <div className='backToShop' style={{textDecoration: 'none', color: '#7E7E7E'}}>Что-то забыли? <Link to='/main' style={{textDecoration: 'none', color: '#7E7E7E'}}>Вернитесь в каталог товаров</Link></div>
                        </div>
                        <div className='cartAside'>
                            <div className='cartHeader'>Оформление заказа</div>
                            <div className='cartPath'>Введите адрес своей электронной почты. На этот адрес будут отправляться уведомления о статусе заказа.</div>
                            <form onSubmit={cartSubmit}>
                                <CartInput id={'3'} height={'50px'} width={'90%'} bottom={'16px'} top={'0px'} placeholder='Ваш адрес электронной почты'/>
                                <div className='emailErrorMessage' id='err3'>С введённым адресом что-то не так. Пожалуйста, убедитесь, что ввели электронный адрес правильно.</div>
                                <div className='searchCategory' style={{marginBottom: '10px'}}>
                                    <div className='fakeCheckBox' id='cartCheck1' onClick={() => checkFunc('cartCheck1')}></div>
                                    <div className='searchSaleText'>
                                        Я принимаю условия: Условия доставки и оплаты, Согласие на обработку персональных данных
                                    </div>
                                </div>
                                <div className='searchCategory' style={{marginBottom: '10px'}}>
                                    <div className='fakeCheckBox' id='cartCheck2' onClick={() => checkFunc('cartCheck2')}></div><div className='searchSaleText'>
                                        Подписаться на новости и эксклюзивные предложения
                                    </div>
                                </div>
                                <div className='cartContinueContainer' id='c1'>
                                    <button className='cartContinueButton' id='cartFakePromoButton10'>Оформить заказ</button>
                                    <div className='cartContinueTextContainer'>
                                        <div className='lockImgContainer'><img style={{width:'100%', height: '100%'}} src={lock_img}></img></div>
                                        <div className='cartContinueText'>Все данные защищены сертификатом TLS и передаются в зашифрованном виде.</div>
                                    </div>
                                </div>
                            </form>
                            <div className='bigCartText'>Далее</div>
                            <div className='cartText'>
                                Способ доставки<br></br>
                                Выберите, как будете получать свой заказ.
                            </div>
                            <div className='cartText'>
                                Оплата<br></br>
                                Выберите способ оплаты и введите платёжные данные.
                            </div>
                            <div className='cartText'>
                                Подтверждение заказа<br></br>
                                Разместите заказ и получите подтверждение по электронной почте.
                            </div>
                        </div>
                    </div>
                    <div className='cartFooter'>
                        <div className='cartFooterHeader'>Возможно, вас заинтересует</div>
                        <div className='cartFooterProducts'>
                            {recItems.map(elem => {
                                return <Item low_padding={true} product={elem}></Item>
                            })}
                        </div>
                    </div>
                </div>
                </div>
            )
        }
    }
    
}


export default NewCart;

