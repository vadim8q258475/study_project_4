import { useEffect } from 'react'
import './cart_input.css'
import store from '../../store/redux_main';
import { useDispatch, useSelector } from 'react-redux';
import $ from 'jquery'


export default function CartInput(props){
    let value = useSelector(store => store)
    let dispatch = useDispatch();
    let update_type = {
        '1': 'updatePromo',
        '2': 'updateCertificate',
        '3': 'updateEmail',
        '4': 'updateCountry',
        '5': 'updateName',
        '6': 'updateNumber',
        '7': 'updateAddress',
        '8': 'updateCity',
        '9': 'updateIndex',
        '10': 'updateComment',
        '11': 'setLogin',
        '12': 'setPassword',
    }
    let value_dct = {
        '1': useSelector(store => store.promo.promo),
        '2': useSelector(store => store.promo.certificate),
        '3': useSelector(store => store.promo.email),
        '4': useSelector(store => store.promo.country),
        '5': useSelector(store => store.promo.name),
        '6': useSelector(store => store.promo.number),
        '7': useSelector(store => store.promo.address),
        '8': useSelector(store => store.promo.city),
        '9': useSelector(store => store.promo.index),
        '10': useSelector(store => store.promo.comment),
        '11': useSelector(store => store.account.login),
        '12': useSelector(store => store.account.password),
    }
    let value_type = {
        '1': 'promo',
        '2': 'certificate',
        '3': 'email',
        '4': 'country',
        '5': 'name',
        '6': 'number',
        '7': 'address',
        '8': 'city',
        '9': 'index',
        '10': 'comment',
        '11': 'login',
        '12': 'password',
    }
    useEffect(() => {
        let container = document.getElementById(`inputContainer${props.id}`)
        let elem = document.getElementById(`input${props.id}`)
        container.style.height = props.height
        container.style.width = props.width
        container.style.marginBottom = props.bottom
        container.style.marginTop = props.top
        elem.addEventListener('focus', ()=>{
            container.style.border = '1px solid #ff7e2f'
        })
        elem.addEventListener('blur', ()=>{      
            container.style.border = '1px solid rgb(224, 221, 221)'
        })
    }, [])
    function useChangeHandler(event){
        let container = document.getElementById(`inputContainer${props.id}`)
        let new_value = event.target.value
        $.ajax({
            url: 'http://127.0.0.1:8000/update_order',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                field_name: value_type[props.id],
                field_value: new_value
            },
            success: (data) => {
                console.log(data)
            },
            error: (err) => {
                console.log(err)
                localStorage.setItem(value_type[props.id], new_value)
            },
        })
        dispatch({type: update_type[props.id], payload: new_value})
        console.log(value)
        let err = document.getElementById(`err${props.id}`)
            if(err){
                if(err.style.display != 'none'){
                    err.style.display = 'none'
                    if(props.id == '1' || props.id == '2'){
                        container.style.boxShadow = 'none'
                    }
                }
                if(props.id == '1'){
                    container.style.marginBottom = '5px'
                }else if(props.id == '9'){
                    container.style.marginBottom = '32px'
                }else{
                    container.style.marginBottom = '16px'
                }
            }
    }
    return (
        <div className='cartFakePromoInput' id={`inputContainer${props.id}`}>
            <input placeholder={props.placeholder} className='cartTrueInput' onChange={useChangeHandler} id={`input${props.id}`} value={value_dct[props.id]}></input>
        </div>
    )
}