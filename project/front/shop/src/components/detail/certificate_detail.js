import './certificate_detail.css'


import { useEffect, useState } from 'react';
import Item from '../item/item'
import './detail.css'
import destructLocalStorage from '../../utils/destruct_local_storage';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import $ from 'jquery'
import certificateDestructLocalStorage from '../../utils/sertificate_destruct_local_storage';

export function CertificateDetail(props){
    const [nominal, setNominal] = useState(3000)
    const [recItems, setRecItems] = useState([])
    let dispatch = useDispatch()
    const elem = document.querySelector('body');

    elem.addEventListener('mousemove', function (event) {
        const x = event.clientX; 
        const y = event.clientY;
    });
    function radioFunc(id, s_id, nominal){
        let new_s_id
        let new_id
        setNominal(nominal)
        for(let i = 1; i<6; i++){
            new_s_id = 'sradio' + i.toString()
            new_id = 'radio' + i.toString()
            if(new_id == id){
                document.getElementById(s_id).style.height = '9px'
                document.getElementById(s_id).style.width = '9px'
                document.getElementById(id).style.border = '0.5px solid #ff7e2f'
            }else{
                document.getElementById(new_s_id).style.height = '18px'
                document.getElementById(new_s_id).style.width = '18px'
                document.getElementById(new_id).style.border = '0.5px solid rgb(148, 146, 146)'
            }
        }
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



        let nom = nominal
        let qty = 1
        let arr = certificateDestructLocalStorage()
        for(let i = 0; i<arr.length; i++){
            if(arr[i].nominal == nom){
                qty = arr[i].qty + 1
            }
        }
        localStorage.setItem(`${nominal}`, `${qty}`)
        dispatch({type: 'plus', payload: 1})
        dispatch({type: 'plusTotal', payload: nominal})
        dispatch({type: 'setCart', payload: ''}) 
    }




    function addToCart2(){
        
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

            let nom = nominal
            let qty = 1
            let arr = certificateDestructLocalStorage()
            for(let i = 0; i<arr.length; i++){
                if(arr[i].nominal == nom){
                    qty = arr[i].qty + 1
                }
            }
            localStorage.setItem(`${nominal}`, `${qty}`)
            dispatch({type: 'plus', payload: 1})
            dispatch({type: 'plusTotal', payload: 1000})
            dispatch({type: 'setCart', payload: ''})   
    }

    function btnFunction(){
        let lst = certificateDestructLocalStorage()
        for(let i = 0; i<lst.length; i++){
            let nom = lst[i].nominal
            if(nom == nominal){
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
        return <div className='detailButtonContainer'>
            <button className='detailButton' onClick={addToCart1} id='detailButton1' style={{display: 'block'}}>
                <div id='detailBtnText3'>В корзину</div>
                <img className='btnImgSuc' id='btnImgSuc3' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
            </button>
            <button className='detailAddedButton1' onClick={addToCart2} style={{display: 'none'}} id='detailAddedButton11'>
                <div id='detailBtnText2'>Добавить еще</div>
                <img className='btnImgSuc' id='btnImgSuc2' src='https://www.svgrepo.com/show/419538/accept-checklist-checkmark.svg'></img>
            </button>
            <Link to='/cart'><button className='detailAddedButton2' style={{display: 'none'}} id='detailAddedButton21'>Корзина</button></Link>
            </div>
    }
    useEffect(() => {
        radioFunc('radio2', 'sradio2', 3000)
        $.ajax({
            url: 'http://127.0.0.1:8000/main',
            method: 'get',
            dataType: 'json',
            success: function(data){
                let new_data = []
                for(let i = 0; i<6; i++){
                    new_data.push(data[i])
                }

                setRecItems(new_data)
                console.log(data)
            },   
        })
    }, [])
    return (
       
        <div className='detail1'>

            <div className='detailGallery1'>
                <div className='mainGallery1'>
                    <div>
                        <img style={{width: '100%', height: '100%'}} src={'https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/2702899141.jpg'}></img>
                    </div>
                </div>
            </div>
            <div className='detailInfoContainer'>
                <div className='detailInfo'>
                    <div className='detailNameContainer'><div className='detailName'>Подарочный сертификат</div></div>
                    <div className='detailPath'>Магазин<div className='detailPath' style={{marginRight: '10px', marginLeft: '10px'}}>/</div>Подарочные Сертификаты</div>
                    <div className='detailPrice'>{nominal} ₽</div>

                            <div className='searchRadioContainer' onClick={() => radioFunc('radio1', 'sradio1', 1000)}>
                                <div className='searchRadio' id='radio1'><div className='smallSearchRadio' id='sradio1'></div></div><div className='searchRadioText'>1 000</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio2', 'sradio2', 3000)}>
                                <div className='searchRadio' id='radio2'><div className='smallSearchRadio' id='sradio2'></div></div><div className='searchRadioText'>3 000</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio3', 'sradio3', 5000)}>
                                <div className='searchRadio' id='radio3'><div className='smallSearchRadio' id='sradio3'></div></div><div className='searchRadioText'>5 000</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio4', 'sradio4', 10000)}>
                                <div className='searchRadio' id='radio4'><div className='smallSearchRadio' id='sradio4'></div></div><div className='searchRadioText'>10 000</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio5', 'sradio5', 20000)}>
                                <div className='searchRadio' id='radio5'><div className='smallSearchRadio' id='sradio5'></div></div><div className='searchRadioText'>20 000</div>
                            </div>
                    <div className='detailDrop1'>
                        <button onClick={() => {console.log(localStorage)}}>d</button>
                        {btnFunction()}
                    ТОЛЬКО ДЛЯ ОНЛАЙН ПОКУПОК! <br></br> <br></br>

                    Электронный подарочный сертификат. Сразу после <br></br>
                    покупки вы получите сертификат и инструкции, как его  <br></br>
                    использовать, на почту. Сертификатом можно оплачивать <br></br>
                    любые товары только в интернет-магазине. Его можно  <br></br>
                    использовать в нескольких заказах, пока на нём не  <br></br>
                    закончатся деньги.
                    </div>
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

