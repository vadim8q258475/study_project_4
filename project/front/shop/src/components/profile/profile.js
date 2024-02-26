import { useEffect, useState } from "react"
import $ from 'jquery'
import { Link, useNavigate } from "react-router-dom"
import './profile.css'
import { Order } from "./order"
import { useDispatch, useSelector } from "react-redux"
import CartInput from "../../elements/inputs/cart_input"

export function Profile(){
    let [isLoaded1, setIsLoaded1] = useState(false)
    let [isLoaded2, setIsLoaded2] = useState(false)
    let [isLoaded3, setIsLoaded3] = useState(false)
    let [user, setUser] = useState({})
    let [orders, setOrders] = useState([])
    let [viewItems, setViewItems] = useState([])
    let [otherItemsQty, setOtherItemsQty] = useState(0)
    let [items, setItems] = useState([])
    let [cart, setCart] = useState({})
    let [emptyCart, setEmptyCart] = useState(false)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let dash_style = {display: 'inline-block', marginLeft: '10px', marginRight: '10px'}
    let logout_url = 'http://127.0.0.1:8000/auth/token/logout/'
    let count = useSelector(store => store.cart)
    let username = useSelector(store => store.account.login)
    let email = useSelector(store => store.promo.email)

    function logoutFunc(){
        $.ajax({
            url: logout_url,
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: (data) => {
                console.log(data)
                localStorage.removeItem('token')
                localStorage.removeItem('password')
                localStorage.removeItem('login')
                localStorage.removeItem('email')
                navigate('/account')
            },
            error: (err) => {
                console.log(err)
            },
        })
        localStorage.clear()
    }

    function changeEmailAndName(){
        let userInfo = document.getElementById('accountAsideTextContainerGrid1')
        let inputGroup = document.getElementById('profileInputGroup1')
        userInfo.style.display = 'none'
        inputGroup.style.display = 'block'
    };

    function saveChanges(){
        let userInfo = document.getElementById('accountAsideTextContainerGrid1')
        let inputGroup = document.getElementById('profileInputGroup1')

        $.ajax({
            url: 'http://127.0.0.1:8000/update_user',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                username: username,
                email: email,
            },
            success: function(data){
                console.log(data)
            },
        })

        userInfo.style.display = 'block'
        inputGroup.style.display = 'none'
    };


    function func(){
        if(items.length>2){
            return <div className="accountCartProduct"><div className="otherQty">+{count - viewItems.length}</div></div>
        }
    }

    useEffect(() => {
        $.ajax({
            url: 'http://127.0.0.1:8000/get_cart_info',
            method: 'get',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: function(data){
                setCart(data)
                console.log(cart)
                if(!data.products){
                    setEmptyCart(true)
                }else{
                    setItems(data.products)
                    let lst= []
                    for(let i=0; i<2; i++){
                        lst.push(data.products[i])
                    }
                    setViewItems(lst)
                    setOtherItemsQty(items.lenght - lst.length)
                    setIsLoaded3(true)
                }
            }
        })
        $.ajax({
            url: 'http://127.0.0.1:8000/profile',
            method: 'get',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: (data) => {
                console.log(data)
                setUser(data)
                dispatch({type: 'setLogin', payload: data.username})
                dispatch({type: 'updateEmail', payload: data.email})
                setIsLoaded2(true)
            },
            error: (err) => {
                console.log(err)
                navigate('/account')
            },
        })
        $.ajax({
            url: 'http://127.0.0.1:8000/get_orders',
            method: 'get',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            success: function(data){
                setOrders(data)
                console.log(data)
                setIsLoaded1(true)
            },  
            error: (err) => {
                console.log(err)
            },

        })
    }, [])
    if(!isLoaded1 || !isLoaded2 || !isLoaded3){
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

                        <div className='accountAsideTextContainerGrid' id = 'accountAsideTextContainerGrid1'>
                            <svg height="34" viewBox="0 0 34 34" width="34" xmlns="http://www.w3.org/2000/svg"><path d="M6.591 29.04c2.246-3.17 6.58-3.257 7.774-4.858l.194-1.647c-2.386-1.209-4.084-3.904-4.084-7.314C10.475 10.73 13.397 8 17 8c3.604 0 6.526 2.73 6.526 7.221 0 3.38-1.64 6.058-3.995 7.286l.222 1.788c1.301 1.514 5.461 1.653 7.657 4.751" fill="none" fill-rule="evenodd" stroke="currentColor"></path></svg>
                            <div className='profileInfoContainer'>
                                <div className='profileInfo'>
                                    <div style={{fontSize: '12px', marginBottom: '2px'}}>{user.username}</div>
                                    <div onClick={changeEmailAndName} style={{fontSize: '12px', color: '#757575', marginTop: '2px', cursor: 'pointer'}}>{user.email}<div style={{marginLeft: '10px', textDecoration: 'none', display: 'inline-block'}}>Изменить</div></div>
                                </div>
                            </div>
                        </div>
                        <div className="profileInputGroup" id='profileInputGroup1'>
                            <form>
                                <CartInput id={'11'} height={'40px'} width={'355px'} bottom={'10px'} top={'0px'} placeholder='Ваш логин' />
                                <div className='emailErrorMessage' id='err11'>Пожалуйста заполните это поле</div>
                                
                                <CartInput id={'3'} height={'40px'} width={'355px'} bottom={'10px'} top={'0px'} placeholder='Ваш адрес электронной почты' />
                                <div className='emailErrorMessage' id='err3'>Пожалуйста, введите ваш действительный адрес почты</div>
                                
                              
                                    <button className='cartContinueButton' id='cartFakePromoButton12' onClick={saveChanges}>Сохранить</button>
                             
                            </form>
                        </div>

                        <hr></hr>
                        <div className='accountAsideTextContainer'>
                            <div className='accountAsideHeader'>Корзина</div>
                            <div className='accountAsideText'>
                                <div style={{display: 'grid', gridTemplate: '1fr / auto auto'}}>
                                    <div className="accountCartContainer">
                                        {viewItems.map(elem => {
                                            if(elem){
                                                return <div className="accountCartProduct">
                                                    <img src={elem.product.photos[0]} style={{width: '60px', height: '60px', marginRight: '5px', display: 'inline-block'}}></img>
                                                </div>
                                            }
                                        })}
                                        {func()}
                                
                                    </div>
                                    <div className="accountCartInfo">
                                        <div>{count} Товаров ({cart.total} ₽)<br></br>
                                        Оформить заказ</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='accountAsideTextContainer'>
                            <div className='accountAsideHeader'>Избранное</div>
                            <div className='accountAsideText'>
                                Нет сохранённых товаров
                            </div>
                        </div>
                        <div className='accountAsideTextContainer' style={{marginBottom: '20px'}}>
                            <div className='accountAsideHeader'>Правовая информация</div>
                            <div className='accountAsideText'>
                                Условия доставки и оплаты / Shipping and Payment
                                Согласие на обработку персональных данных / Consent to the Processing of Personal Data
                            </div>
                        </div>
                        <hr></hr>
                        <div onClick={logoutFunc} style={{fontSize: '12px', color: '#757575', marginTop: '2px', marginBottom: '50px', cursor: 'pointer'}}>Есть другой аккаунт? <div style={{marginLeft: '10px', textDecoration: 'none', display: "inline-block"}}>Выйти</div></div>
                    </div>
                    <div className='accountAside'>
                        <div className='accountHeader' style={{marginBottom: '5px'}}>Заказы</div>
                        

                        {orders.map(elem => {
                            return <Order order={elem}/>
                        })}

                        <hr style={{marginBottom: '20px'}}></hr>
                        <div className="profileFootH">Нужна помощь? Свяжитесь с нами</div>
                        <div className="profileFootP">shop@vsrap.com</div>
                    </div>
                </div>
            </div>
        )
    }
}