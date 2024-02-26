import { Link } from 'react-router-dom'
import Item from '../item/item'
import './products.css'


function Products(props){
    let glass_img = 'https://cdn-icons-png.flaticon.com/512/622/622669.png'
    return (
        <div>
        {props.header}
        <div className='products'>
            {props.products.map(elem => {
                return (
                    <div className='productsCol'>
                    <Item product = {elem}/>
                </div>
                )
            })
                
            }
        </div>
        </div>
    )
}
export default Products