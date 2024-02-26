import React, { useEffect, useState } from "react";
import axios from "axios";
import { Provider, useDispatch, useSelector } from 'react-redux'
import Main from "./components/main/main";
import Products from "./components/products/products";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Detail from "./components/detail/detail";
import DetailSlider from "./components/detail_slider/detail_slider";
import Search from "./components/search/search";
import Cart from "./components/cart/cart";
import NewCart from "./components/cart/cart";
import destructLocalStorage from "./utils/destruct_local_storage";
import { DeliveryInfo } from "./components/delivery_info/delivery_info";
import { convertPath } from "./utils/convertHeader";
import { Contacts } from "./components/contacts/contacts";
import { CertificateDetail } from "./components/detail/certificate_detail";
import certificateDestructLocalStorage from "./utils/sertificate_destruct_local_storage";
import { ConfirmPage } from "./components/confirm_page/confirm_page";
import { DeliveryPage } from "./components/confirm_page/delivery_page";
import { PaymentPage } from "./components/confirm_page/payment_page";
import { customerInfoSetter } from "./utils/customerInfoSetter";
import { Account } from "./components/account/account";
import store from "./store/redux_main";
import { Profile } from "./components/profile/profile";
import $ from 'jquery'
import { MainPage } from "./components/main_page/main_page";
import { SlideBanner } from "./elements/slider_banner/slider_banner";

function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [allItems, setAllItems] = useState([]);

  const [comps, setComps] = useState([])
  let dispatch = useDispatch()
  let qty = useSelector(store => store.cart)
  dispatch({
    type: 'setCart', 
    payload: ''
  })

  if(qty == 0){
    let counter = 0
    let arr = destructLocalStorage()
    for(let i = 0; i<arr.length; i++){
      counter += arr[i].qty
    }
    let arr1 = certificateDestructLocalStorage()
    for(let i = 0; i<arr1.length; i++){
      counter += arr1[i].qty
    }
    
    dispatch({
      type: 'plus',
      payload: counter
    })
  }


  let loadCounter = 0
  let urls = ['main', 'cmh', 'booker', 'vsrap', 'gspd', 'snailkick', 'hoodie', 'tshirts', 'out_cloth', 'sweaters', 'scarves', 'sale']
  let components = []

  useEffect(() => {
    console.log(localStorage)
    //localStorage.clear()
    //--------------------------------//
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
        'deliveryPrice': 'setDeliveryPrice', 
        'products': 'setCartProducts',
        //cart

        'password': 'setPassword',
        'login': 'setLogin',
    }
    $.ajax({
      url: 'http://127.0.0.1:8000/get_cart_info',
      method: 'get',
      dataType: 'json',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      success: function(data){
        let qty = 0 ;
        for(let key in data){
          if(key_dct[key]){
            dispatch({type: key_dct[key], payload: data[key]})
          }
        }
        data.products.map((elem) => {
          localStorage.setItem(`${elem.product.id} ${elem.size}`, elem.qty)
          qty+=elem.qty
        })
        dispatch({type: 'setCartQty', payload: qty})
      }, 
      error: function(err){
        for(let key in key_dct){
          if(key_dct[key]){
            console.log(key_dct[key])
            dispatch({type: key_dct[key], payload: localStorage.getItem(key)})
          }
        }
      }
    })
    $.ajax({
      url: 'http://127.0.0.1:8000/get_user_order_info',
      method: 'get',
      dataType: 'json',
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      },
      success: function(data){
        for(let key in data){
          if(key_dct[key]){
            dispatch({type: key_dct[key], payload: data[key]})
          }
        }
      },
      error: function(err){
        for(let key in key_dct){
          console.log(key_dct[key])
          dispatch({type: key_dct[key], payload: localStorage.getItem(key)})
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
          dispatch({type: 'setLogin', payload: data.username})
          dispatch({type: 'updateEmail', payload: data.email})
          localStorage.setItem('login', data.username)
          localStorage.setItem('email', data.email)
      },
  })
    //--------------------------------//
    console.log(store.getState())
    let url;
    let err;
    for(let i = 0; i<urls.length; i++){
      url = 'http://127.0.0.1:8000/' + urls[i]
      axios.get(url)
      .then(
        (res) => {
          if(urls[i] == 'main'){
            setAllItems(res.data)
      
          }
          
          let path = `/${urls[i]}`
          let comp;
          if(urls[i] == 'main'){
            comp = <Route element={<Main stl={{width: '100%'}} component={<MainPage products = {res.data}/>}></Main>} path='/main'></Route>;
          }else{
            comp = <Route element={<Main component={<Products products = {res.data} header = {convertPath(urls[i])}/>}/>} path={path}/>
          }
          components.push(comp)
          if(components.length >=10){
            setIsLoaded(true)
            setComps(components)
          }
 
        },
        (error) => {
          err = true
        }
      )
    }
  }, [])
 
  if (!isLoaded) {
    console.log(isLoaded)
    return <div className="loading">
            <div>
              <img src='https://i.ibb.co/x12rjf8/vsgif180.gif'></img>
              <div className="loadingText">Загрузка...</div>
            </div>
            </div>
  }else{
    console.log(components)
    return (
      <Router>
        <Routes>
          <Route element={<SlideBanner/>} path='/test'></Route>
          <Route element={<Main component={<Profile/>}></Main>} path='/profile'></Route>
          <Route element={<Main component={<Account/>}></Main>} path='/account'></Route>
          <Route element={<Main component={<PaymentPage/>}></Main>} path='/payment_page'></Route>
          <Route element={<Main component={<DeliveryPage/>}></Main>} path='/delivery_page'></Route>
          <Route element={<Main component={<ConfirmPage/>}></Main>} path='/confirm_page'></Route>
          <Route element={<Main component={<CertificateDetail/>}></Main>} path='/certificate'></Route>
          <Route element={<Main stl={{width: '100%'}} component={<Contacts/>}></Main>} path='/contacts'></Route>
          <Route element={<Main component={<DeliveryInfo/>}></Main>} path='/delivery_info'></Route>
          <Route element={<Main component={<NewCart/>}></Main>} path={'/cart'}></Route>
          <Route element={<Main component={<Search/>}></Main>} path='/search'></Route>
          {/*<Route element={<Main component={<Products products={allItems}/>}></Main>} path="/main"></Route>*/}
          {comps.map(elem => {
            return elem
          })}
          {allItems.map(elem => {
            let path = `/${elem.id}`
            return (
              <Route element={<Main component={<Detail product={elem}/>}/>} path={path}/>
            )
          })}
        </Routes>
      </Router>
    );
  }
}


export default App;
