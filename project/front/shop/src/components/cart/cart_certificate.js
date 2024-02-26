import { useDispatch } from 'react-redux'
import './cart_product.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export default function CartCertificate(props){
    let arrow_img = 'https://cdn-icons-png.flaticon.com/512/54/54785.png'
    let x_img = 'https://cdn-icons-png.flaticon.com/512/7420/7420933.png'
    let prod = 'https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/4028863127.jpg'
    let img_style = {width:'100%', height: '100%', display: 'inline-block'}

    let dispatch = useDispatch()
    function dltFunc(){
        let key = `${props.nominal}`
        localStorage.removeItem(key)
        dispatch({type: 'setCart', payload: ''})
        dispatch({type: 'minus', payload: props.qty})
        dispatch({type: 'minusTotal', payload: props.qty*props.nominal})
        document.getElementById(`${props.nominal}`).style.display = 'none'
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
            <div className='cartProduct' id={`${props.nominal}`}>
                <Link to={`/certificate`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className='cartProductImgContainer'>
                        <img src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/2702899141.jpg' className='cartProductImg'></img>
                    </div>
                </Link>
                <div className='cartProductInfoContainer'>
                    <div className='cartProductInfo'>
                        <div className='cartProductNameAndDltContainer'>
                            <div className='cartProductName'>Подарочный сертификат</div>
                            {crossImg()}
                        </div>
                        <div className='cartProductSize'>Номинал сертификата: {props.nominal}</div>
                        <div className='cartProductPriceAndQtyContainer'>
                            {qtyFunc()}
                            <div className='cartProductPrice'>{props.nominal * props.qty} ₽</div>
                        </div>
                    </div>
                </div>
            </div>
    )
}