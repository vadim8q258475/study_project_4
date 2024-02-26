import './account.css'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import $ from 'jquery'
import destructLocalStorage from '../../utils/destruct_local_storage'
import certificateDestructLocalStorage from '../../utils/sertificate_destruct_local_storage'
import CartInput from '../../elements/inputs/cart_input'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'



export function Account(){
    let dispatch = useDispatch()
    let [items, setItems] = useState([])
    let [isLoaded, setIsLoaded] = useState(false)
    let dash_style = {display: 'inline-block', marginLeft: '10px', marginRight: '10px'}
    let lock_img = 'https://cdn-icons-png.flaticon.com/512/245/245446.png'
    let navigate = useNavigate()

    let password = useSelector(store => store.account.password)
    let login = useSelector(store => store.account.login)
    let email = useSelector(store => store.promo.email)

    function productsFunction(){
        if(items.length == 0){
            return (<div>
                Ваша корзина пуста
            </div>)
        }else{
            return <div>
                {items.map((elem) => {
                    return (<div>
                        {elem.name}
                    </div>)
                })}
            </div>
        }
    }

    function accountSubmit(e){
        e.preventDefault()
        if(login.length == 0 || password.length == 0){
            let btn = document.getElementById('cartFakePromoButton11')
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
            if(login.length == 0){
                let input = document.getElementById('inputContainer11')
                let err = document.getElementById('err11')
                input.style.marginBottom = '0px'
                input.style.border = '1px solid #e56363'
                input.style.boxShadow = '0 0 0 1px #e56363 inset'
                err.style.display = 'block'
            }
            if(password.length == 0){
                let input = document.getElementById('inputContainer12')
                let err = document.getElementById('err12')
                input.style.marginBottom = '0px'
                input.style.border = '1px solid #e56363'
                input.style.boxShadow = '0 0 0 1px #e56363 inset'
                err.style.display = 'block'
            }
        }else{
            let data = {
                "username": login,
                "password": password,
                "email": email
                }
            axios.post('http://127.0.0.1:8000/api/v1/auth/users/', data)
            .then(res => {
                axios.post('http://127.0.0.1:8000/auth/token/login/', data)
                .then((res) => {
                    localStorage.setItem('token', res.data.auth_token)
                    navigate('/profile')
                })
                .catch((err) => {
                    console.log(err)
                })
            })
            .catch(err => {
                console.log(err.response.data)
                console.log(err)
                if(err.response.data.username){
                    if(err.response.data.username[0] == 'A user with that username already exists.'){
                        axios.post('http://127.0.0.1:8000/auth/token/login/', data)
                        .then((res) => {
                            localStorage.setItem('token', res.data.auth_token)
                            navigate('/profile')
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                }
            })
        }
    }

    useEffect(()=>{
        if(localStorage.getItem('token')){
            navigate('/profile')
        }
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
    }, [])
    if(!isLoaded){
        return <div className="loading">
                <div>
                <img src='https://i.ibb.co/x12rjf8/vsgif180.gif'></img>
                <div className="loadingText">Загрузка...</div>
                </div>
                </div>
    }else{
        return (
            <div>
                <div className='accountMainContainer'>
                    <div className='accountMain'>
                        <div className='accountHeader'>Личный кабинет</div>
                        <div className='accountPath'>Магазин<div style={dash_style}>/</div>Личный кабинет</div>
                        <div className='accountAsideTextContainerGrid'>
                            <svg height="34" viewBox="0 0 34 34" width="34" xmlns="http://www.w3.org/2000/svg"><path d="M6.591 29.04c2.246-3.17 6.58-3.257 7.774-4.858l.194-1.647c-2.386-1.209-4.084-3.904-4.084-7.314C10.475 10.73 13.397 8 17 8c3.604 0 6.526 2.73 6.526 7.221 0 3.38-1.64 6.058-3.995 7.286l.222 1.788c1.301 1.514 5.461 1.653 7.657 4.751" fill="none" fill-rule="evenodd" stroke="currentColor"></path></svg>
                            <div className='profileInfoContainer'>
                                <div className='profileInfo'>
                                    <div style={{fontSize: '12px', marginBottom: '2px'}}>Гостевой аккаунт</div>
                                    <div style={{fontSize: '12px', color: '#757575', marginTop: '2px'}}>Уже регистрировались <Link style={{marginLeft: '10px', textDecoration: 'none'}}>Войти в аккаунт</Link></div>
                                </div>
                            </div>
                        </div>
                        <hr></hr>
                        <div className='accountAsideTextContainer'>
                            <div className='accountAsideHeader'>Корзина</div>
                            <div className='accountAsideText'>
                                Ваша корзина пуста
                            </div>
                        </div>
                        <div className='accountAsideTextContainer'>
                            <div className='accountAsideHeader'>Избранное</div>
                            <div className='accountAsideText'>
                                Нет сохранённых товаров
                            </div>
                        </div>
                        <div className='accountAsideTextContainer' style={{marginBottom: '50px'}}>
                            <div className='accountAsideHeader'>Правовая информация</div>
                            <div className='accountAsideText'>
                                Условия доставки и оплаты / Shipping and Payment
                                Согласие на обработку персональных данных / Consent to the Processing of Personal Data
                            </div>
                        </div>
                    </div>
                    <div className='accountAside'>
                        <div className='accountsmallerHeader'>Зарегистрируйтесь или войдите</div>
                        <div className='accountText'>
                            Вы сможете быстрее оформлять и отслеживать свои заказы, а списки избранных товаров будут<br></br>
                            синхронизироваться на всех устройствах, с которых вы заходите в магазин. Введите свой адрес электронной <br></br>
                            почты и мы отправим вам ссылку для мгновенного входа в аккаунт.<br></br>
                        </div>
                        <div className='accountText'>
                            Мы автоматически создадим для вас аккаунт, если у вас его ещё нет.
                        </div>
                        <form onSubmit={accountSubmit} id='loginForm'>
                            
                            <CartInput id={'11'} height={'40px'} width={'714px'} bottom={'16px'} top={'0px'} placeholder='Ваш логин' />
                            <div className='emailErrorMessage' id='err11'>Пожалуйста заполните это поле</div>
                            
                            <CartInput id={'3'} height={'40px'} width={'714px'} bottom={'16px'} top={'0px'} placeholder='Ваш адрес электронной почты' />
                            <div className='emailErrorMessage' id='err3'>Пожалуйста, введите ваш действительный адрес почты</div>
                            
                            <CartInput id={'12'} height={'40px'} width={'714px'} bottom={'16px'} top={'0px'} placeholder='Ваш пароль' />
                            <div className='emailErrorMessage' id='err12'>Пожалуйста заполните это поле</div>
                            
                            <div className='accountText'>
                                Продолжая, вы принимаете условия: Согласие на обработку персональных данных / Consent to the Processing of <br></br>
                                Personal Data
                            </div>
                            <div className='cartContinueContainer' id='c2'>
                                <button className='cartContinueButton' id='cartFakePromoButton11'>Войти</button>
                            </div>    
                        </form>
                    </div>
                </div>
            </div>
            )
    }
}