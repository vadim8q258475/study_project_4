import { useEffect, useState } from 'react';
import Item from '../item/item'
import './detail.css'
import destructLocalStorage from '../../utils/destruct_local_storage';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery'

function Detail(props){
    let [page_size, setSize] = useState(null)
    const [recItems, setRecItems] = useState([])
    let sizes = [['s', props.product.s], ['m', props.product.m], ['l', props.product.l], ['xl', props.product.xl], ['xxl', props.product.xxl]]
    let [divElem, setDivElem] = useState(<button>ds</button>)
    let arr = destructLocalStorage()
    let dispatch = useDispatch()
    const elem = document.querySelector('body');
    let [isDivLoaded, setIsDivLoaded] = useState(false)

    console.log(localStorage)

    elem.addEventListener('mousemove', function (event) {
        const x = event.clientX; 
        const y = event.clientY;
    });

    useEffect(()=>{
  
    }, [])

    function dropDisplay(id){
        let elem = document.getElementById(id)
        console.log(elem.style.maxHeight )
        if(elem.style.maxHeight == '14.4px' || elem.style.maxHeight == ''){
            elem.style.maxHeight = '200px'
        }else{
            elem.style.maxHeight = '14.4px'
        }
    }
    function sizeChanger(elem){
        let btn1 = document.getElementById('detailButton1')
        let btn2 = document.getElementById('detailAddedButton11')
        let btn3 = document.getElementById('detailAddedButton21')
        if(btn1){
        
                btn1.style.display = 'block'
                btn2.style.display = 'none'
                btn3.style.display = 'none'
        
        }
        let id = `${elem[0]}${props.product.id}`
        setSize(elem[0])
        for(let i = 0; i<sizes.length; i++){
            let size = sizes[i]
            let size_id = `${size[0]}${props.product.id}`
            let size_box = document.getElementById(size_id)
            if(size_id == id && size[1] != 0){
                size_box.style.backgroundColor = 'black'
                size_box.style.color = 'white'
            }else if(size_id != id && size[1] != 0){
                size_box.style.backgroundColor = 'white'
                size_box.style.color = 'black'
            }
        }
        console.log(page_size)
    }
    function addToCart1(){

        let animate_list1 = [
            {opacity: '0.1'},
            {opacity: '0.2'},
            {opacity: '0.3'},
            {opacity: '0.4'},
            {opacity: '0.5'},
            {opacity: '0.6'},
            {opacity: '0.7'},
            {opacity: '0.8'},
            {opacity: '0.9'},
            {opacity: '1'},
        ]
        let reverse_animate_list = [
            {opacity: '1'},
            {opacity: '0.9'},
            {opacity: '0.8'},
            {opacity: '0.7'},
            {opacity: '0.6'},
            {opacity: '0.5'},
            {opacity: '0.4'},
            {opacity: '0.3'},
            {opacity: '0.2'},
            {opacity: '0.1'},
            {opacity: '0'},
        ]
   
        
        let btn2 = document.getElementById('detailButton1')
        let btn2_text = document.getElementById('detailBtnText3')
        let btn2_img = document.getElementById('btnImgSuc3')

        btn2_text.animate(reverse_animate_list, {duration: 200, iterations: 1})
        btn2_text.style.opacity = '0'
        btn2_text.style.display = 'none'
        btn2_img.style.display = 'block'
        btn2_img.animate(animate_list1, {duration: 500, iterations: 1})
        btn2_img.style.opacity = '1'

        setTimeout(() => {
            btn2_img.style.opacity = '0'
            btn2_img.style.display = 'none'
            btn2_text.style.display = 'block'
            btn2_text.animate(animate_list1, {duration: 200, iterations: 1})
            btn2_text.style.opacity = '1'
        }, 1000)



        // ----------------------------------------- // добавление в корзину одного продукта
        let product = props.product
        let id = product.id
        let size = page_size
        $.ajax({
            url: 'http://127.0.0.1:8000/add_to_cart',
            method: 'post',
            dataType: 'json',
            headers: {
                Authorization: `Token ${localStorage.getItem('token')}`
            },
            data: {
                id: props.product.id, 
                size: page_size
            },
            success: function(data){
                console.log(data)
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
                            qty+=elem.qty
                        })
                        dispatch({type: 'setCartQty', payload: qty})
                    },
                })
            },  
            error: function(err){
                console.log(err)
                if(true){
                    let qty = 1
                    arr = destructLocalStorage()
                    for(let i = 0; i<arr.length; i++){
                        if(arr[i].id == id && arr[i].size == size){
                            qty = arr[i].qty + 1
                        }
                    }
                    localStorage.setItem(`${id} ${size}`, `${qty}`)
                    dispatch({type: 'plus', payload: 1})
                    dispatch({type: 'plusTotal', payload: props.product.price})
                    dispatch({type: 'setCart', payload: ''})
                }
            }
        })
        // ----------------------------------------- //
    }
    function addToCart2(){
        if(page_size == null){
            let btn1_2 = document.getElementById('detailButton2')
            btn1_2.animate(
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
            let animate_list1 = [
                {opacity: '0.1'},
                {opacity: '0.2'},
                {opacity: '0.3'},
                {opacity: '0.4'},
                {opacity: '0.5'},
                {opacity: '0.6'},
                {opacity: '0.7'},
                {opacity: '0.8'},
                {opacity: '0.9'},
                {opacity: '1'},
            ]
            let reverse_animate_list = [
                {opacity: '1'},
                {opacity: '0.9'},
                {opacity: '0.8'},
                {opacity: '0.7'},
                {opacity: '0.6'},
                {opacity: '0.5'},
                {opacity: '0.4'},
                {opacity: '0.3'},
                {opacity: '0.2'},
                {opacity: '0.1'},
                {opacity: '0'},
            ]

            let btn2 = document.getElementById('detailAddedButton11')
            let btn2_text = document.getElementById('detailBtnText2')
            let btn2_img = document.getElementById('btnImgSuc2')

            let btn3 = document.getElementById('detailAddbtn3')
            let btn3_text = document.getElementById('detailBtnText')
            let btn3_img = document.getElementById('btnImgSuc1')
            if(btn2){
                if(btn2.style.display != 'none' && btn2.style.display != ''){
                    btn2_text.animate(reverse_animate_list, {duration: 200, iterations: 1})
                    btn2_text.style.opacity = '0'
                    btn2_text.style.display = 'none'
                    btn2_img.style.display = 'block'
                    btn2_img.animate(animate_list1, {duration: 500, iterations: 1})
                    btn2_img.style.opacity = '1'

                    setTimeout(() => {
                        btn2_img.style.opacity = '0'
                        btn2_img.style.display = 'none'
                        btn2_text.style.display = 'block'
                        btn2_text.animate(animate_list1, {duration: 200, iterations: 1})
                        btn2_text.style.opacity = '1'
                    }, 1000)
                }else{
                    btn3_text.animate(reverse_animate_list, {duration: 200, iterations: 1})
                    btn3_text.style.opacity = '0'
                    btn3_text.style.display = 'none'
                    btn3_img.style.display = 'block'
                    btn3_img.animate(animate_list1, {duration: 500, iterations: 1})
                    btn3_img.style.opacity = '1'
                    setTimeout(() => {
                        btn3_img.style.opacity = '0'
                        btn3_img.style.display = 'none'
                        btn3_text.style.display = 'block'
                        btn3_text.animate(animate_list1, {duration: 200, iterations: 1})
                        btn3_text.style.opacity = '1'
                    }, 1000)
                }
            }
            // ----------------------------------------- // добавление в корзину одного продукта
            let product = props.product
            let id = product.id
            let size = page_size
            $.ajax({
                url: 'http://127.0.0.1:8000/add_to_cart',
                method: 'post',
                dataType: 'json',
                headers: {
                    Authorization: `Token ${localStorage.getItem('token')}`
                },
                data: {
                    id: props.product.id, 
                    size: page_size
                },
                success: function(data){
                    console.log(data)
                    $.ajax({
                        url: 'http://127.0.0.1:8000/get_cart_info',
                        method: 'get',
                        dataType: 'json',
                        headers: {
                            Authorization: `Token ${localStorage.getItem('token')}`
                        },
                        success: (data) => {
                            console.log(data)
                            data.products.map((elem) => {
                                localStorage.setItem(`${elem.product.id} ${elem.size}`, elem.qty)
                            })
                        },
                    })
                },  
                error: function(err){
                    console.log(err)
                    if(true){
                        let qty = 1
                        arr = destructLocalStorage()
                        for(let i = 0; i<arr.length; i++){
                            if(arr[i].id == id && arr[i].size == size){
                                qty = arr[i].qty + 1
                            }
                        }
                        localStorage.setItem(`${id} ${size}`, `${qty}`)
                        dispatch({type: 'plus', payload: 1})
                        dispatch({type: 'plusTotal', payload: props.product.price})
                        dispatch({type: 'setCart', payload: ''})
                    }
                }
            })
            // ----------------------------------------- //
        }  
    }
    function btnFunction(){
        if(page_size == null){
            //1
            return (<div className='detailAddedButtonContainer' id='btnCont111'>
            <button className='detailButton' onClick={addToCart2} id='detailButton2' style={{display: 'block'}}>В корзину</button>
            </div>)
        }else{
            // ----------------------------------------- // проверка на наличие в корзине
            for(let i = 0; i<arr.length; i++){
                let size = arr[i].size
                if(page_size == size && props.product.id == arr[i].id){
                    return (
                        <div className='detailAddedButtonContainer'>
                            <button className='detailAddedButton1' onClick={addToCart2} id='detailAddbtn3'>
                                <div id='detailBtnText'>Добавить еще</div>
                                <img className='btnImgSuc' id='btnImgSuc1' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                            </button>
                            <Link to='/cart'><button className='detailAddedButton2'>Корзина</button></Link>
                        </div>
                    )
                }
            }
            return (<div className='detailButtonContainer'>
                <button className='detailButton' onClick={addToCart1} id='detailButton1' style={{display: 'block'}}>
                    <div id='detailBtnText3'>В корзину</div>
                    <img className='btnImgSuc' id='btnImgSuc3' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                </button>
                <button className='detailAddedButton1' onClick={addToCart2} style={{display: 'none'}} id='detailAddedButton11'>
                    <div id='detailBtnText2'>Добавить еще</div>
                    <img className='btnImgSuc' id='btnImgSuc2' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
                </button>
                <Link to='/cart'><button className='detailAddedButton2' style={{display: 'none'}} id='detailAddedButton21'>Корзина</button></Link>
                </div> ) 
 
           
        }
    }
    useEffect(() => {
        $.ajax({
            url: 'http://127.0.0.1:8000/create_rec',
            method: 'post',
            dataType: 'json',
            data: {product_id: props.product.id},
            success: function(data){
                setRecItems(data)
                console.log(data)
            },   
        })
    }, [])
    return (
       
        <div className='detail'>

            <div className='detailGallery'>
                <div className='mainGallery'>
                    <div>
                        <img style={{width: '100%', height: '100%'}} src={props.product.photos[0]}></img>
                    </div>
                </div>
                <div className='subGallery'>
                    <div><img style={{width: '100%', height: '100%'}} src={props.product.photos[0]}></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                    <div><img style={{width: '100%', height: '100%'}} src='https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg'></img></div>
                </div>
            </div>
            <div className='detailInfoContainer'>
                <div className='detailInfo'>
                    <div className='detailNameContainer'><div className='detailName'>{props.product.name}</div></div>
                    <div className='detailPath'>Магазин<div className='detailPath' style={{marginRight: '10px', marginLeft: '10px'}}>/</div>SALE</div>
                    <div className='detailPrice'>{props.product.price} ₽</div>
                    

                
                    <div className='detailSizesContainer'>
                        {sizes.map(
                            elem => {
                                if(elem[1]!=0){
                                    return (<div className='detailSize' id={`${elem[0]}${props.product.id}`} onClick={() => sizeChanger(elem)}>{elem[0]}</div>)
                                }
                            }
                        )}
                    </div>




                    {btnFunction()}


                       




                    <div id='detailDrop1' className='detaildropContainer'>
                        <div className='detailDrop' onClick={()=>dropDisplay('detailDrop1')}>О товаре</div>
                        <div className='detailDropContent'>
                            {props.product.description}
                        </div>
                    </div>
                    <div id='detailDrop2' className='detaildropContainer'>
                        <div className='detailDrop' onClick={()=>dropDisplay('detailDrop2')}>Рекомендации по уходу</div>
                        <div className='detailDropContent'>
                            {props.product.care_recommendations}
                        </div>
                    </div>
                    <div className='detailDrop'>Размерная сетка</div>
                </div>
            </div>
            <div className='detailFooter'>
                <div className='detailFooterHeader'>Возможно, вас заинтересует</div>
                <div className='detailFooterProducts'>
                    {recItems.map(elem => {
                        return <Item low_padding={true} product={elem}></Item>
                    })}
                </div>
            </div>
        </div>

        
    )
}

export default Detail