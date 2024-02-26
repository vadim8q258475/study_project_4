import { useEffect } from 'react'
import './item.css'
import { Link } from 'react-router-dom'


function Item(props){
    useEffect(() => {
        let elem = document.getElementById(`itemContainer${props.product.id}`)
        let elem1 = elem.children[0].children[0]
        elem.addEventListener('mouseover', () => {
            elem1.src = props.product.photos[1]
        })
        elem.addEventListener('mouseout', () => {
            elem1.src = props.product.photos[0]
        })
        if(props.low_padding){
            document.getElementById(`cont${props.product.id}`).style.padding = '8px'
        }else{
            document.getElementById(`cont${props.product.id}`).style.padding = '16px'
        }
    })  
    let price_function = () => {
        if(props.product.sale != 0){
            return (
                <div className='itemPrice' id='itemPrice1'>
                    <div style={{display: 'inline-block', marginRight: '8px'}}>{props.product.price_with_sale} ₽</div><div className='priceWithoutSale'>{props.product.price} ₽</div>
                </div>
                )
        }else{
            return (
                <div className='itemPrice' id='itemPrice2'>
                    <div>{props.product.price} ₽</div>
                </div>
            )
        }
    }
    return (
        <Link to={`/${props.product.id}`} style={{textDecoration: 'none', color: 'black'}}>
        <div className='itemContainer' id={`cont${props.product.id}`}>
        <div className='item' id={`itemContainer${props.product.id}`}>
            <div className='itemImgContainer' >
                <img className='itemImg' id={`itemImg${props.product.id}`} src={props.product.photos[0]}></img>
            </div>
            <div className='itemName'>
                {props.product.name}
            </div>
            {price_function()}
        </div>
        </div>
        </Link>
    )
}

export default Item