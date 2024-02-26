import { useDispatch } from 'react-redux'
import './cart_product.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'


export default function CartProduct(props){
    let arrow_img = 'https://cdn-icons-png.flaticon.com/512/54/54785.png'
    let x_img = 'https://cdn-icons-png.flaticon.com/512/7420/7420933.png'
    let prod = 'https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/4028863127.jpg'
    let img_style = {width:'100%', height: '100%', display: 'inline-block'}
    let dispatch = useDispatch()
    function dltFunc(){
        let id = props.product.id
        let size = props.size
        $.ajax({
            url: 'http://127.0.0.1:8000/remove_from_cart',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                id: id,
                size: size
            },
            success: function(data){
                localStorage.removeItem(`${props.product.id} ${props.size}`)
                $.ajax({
                    url: 'http://127.0.0.1:8000/get_cart_info',
                    method: 'get',
                    dataType: 'json',
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`
                    },
                    success: (data) => {
                        console.log(data)
                        let qty = 0
                        data.products.map((elem) => {
                            localStorage.setItem(`${elem.product.id} ${elem.size}`, elem.qty)
                            qty +=elem.qty
                        })
                        dispatch({type: 'setCartQty', payload: qty})
                    },
                })
            },
            error: function(err){
                console.log(err)
                let key = `${id} ${size}`
                localStorage.removeItem(key)
                dispatch({type: 'setCart', payload: ''})
                dispatch({type: 'minus', payload: props.qty})
                dispatch({type: 'minusTotal', payload: props.qty*props.product.price})
            }
        })
        document.getElementById(`${props.product.id}${props.size}`).style.display = 'none'
    }
    function qtyFunc(){
        if(props.confirm){
            return <div className='cartProductQty'>× {props.qty}</div>
        }else{
            return <div className='cartProductQty'>Кол-во: {props.qty} <div className='cartArrContainer'><img style={img_style} src={arrow_img}></img></div></div>
        }
    }
    function crossImg(){
        if(!props.confirm){
            return <div className='cartProductDlt' onClick={dltFunc}><img style={img_style} src={x_img}></img></div>
        }
    }
    return (
            <div className='cartProduct' id={`${props.product.id}${props.size}`}>
                <Link to={`/${props.product.id}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className='cartProductImgContainer'>
                        <img src={props.product.photos[0]} className='cartProductImg'></img>
                    </div>
                </Link>
                <div className='cartProductInfoContainer'>
                    <div className='cartProductInfo'>
                        <div className='cartProductNameAndDltContainer'>
                            <div className='cartProductName'>{props.product.name}</div>
                            {crossImg()}
                        </div>
                        <div className='cartProductSize'>Размер: {props.size}</div>
                        <div className='cartProductPriceAndQtyContainer'>
                            {qtyFunc()}
                            <div className='cartProductPrice'>{props.product.price * props.qty} ₽</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}