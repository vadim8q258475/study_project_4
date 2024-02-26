import { Link } from 'react-router-dom'
import './empty_cart.css'
import { useEffect } from 'react'


export function EmptyCart(props){
    let dash_style = {display: 'inline-block'}
    useEffect(() => {
        if(props.display){
            document.getElementById('emptyCart1').style.display = 'block' 
        }
    }, [])
    return (
    <div id='emptyCart1'>
        <div className='cartHeader'>Карзина</div>
        <div className='cartPath'>Магазин <div style={dash_style}>/</div> Корзина</div>
        <div className='emptyMainContainer'>
            <div className='emptyMainFlex'>
                <div className='emptyText'>Ваша корзина пуста</div>
                <Link to='/main' style={{textDecoration: 'none'}}><button className='emptyButton'><div style={{textDecoration: 'none'}}>Смотреть товары</div></button></Link>
            </div>
        </div>
    </div>
    )
}