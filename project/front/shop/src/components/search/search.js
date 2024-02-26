import { useEffect, useState } from 'react'
import Item from '../item/item'
import './search.css'
import $ from 'jquery'

let Search = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [priceInputMin, setPriceInputMin] = useState(50)
    const [priceInputMax, setPriceInputMax] = useState(19990)
    
    let sort_icon = 'https://cdn.icon-icons.com/icons2/2645/PNG/512/arrow_down_up_icon_160466.png'
    let product={price: 4990, name: 'Худи "Череп" от SNAILKICK', sale: 0, price_with_sale: 4990, photos: ['https://d2j6dbq0eux0bg-cdn.ecwid.net/images/10796017/3466741482.jpg']}
    let arrow_img = 'https://cdn-icons-png.flaticon.com/512/54/54785.png'
    let glass_img = 'https://www.svgrepo.com/show/441994/search.svg'
 

    function inputSliderPriceHandlerMin(event){
        let priceInput1 = document.getElementById('priceInput1')
        setPriceInputMin(event.target.value)
        //console.log(priceInputMin)
        priceInput1.value = event.target.value
    }

    function inputSliderPriceHandlerMax(event){
        let priceInput2 = document.getElementById('priceInput2')
        setPriceInputMax(event.target.value)
        //console.log(priceInputMax)
        priceInput2.value = event.target.value
    }

    function checkFunc(id){
        let elem = document.getElementById(id)
        if(elem.style.backgroundColor == 'rgb(255, 126, 47)'){
            elem.style.backgroundColor = 'rgb(238, 236, 236)'
            elem.style.border = '0.5px solid rgb(148, 146, 146);'
        }else{
            elem.style.backgroundColor = '#ff7e2f'
            elem.style.border = '0.5px solid #ff7e2f'
        }    
    }

    function dropFunc(id, arr_id){
        let elem = document.getElementById(id)
        let arr = document.getElementById(arr_id)
        //console.log(typeof elem.style.display)
        if(elem.style.maxHeight == '' || elem.style.maxHeight == '34.4px'){
            elem.style.maxHeight = '500px'
            arr.style.rotate = '180deg'
        }else{
            elem.style.maxHeight = '34.4px'
            arr.style.rotate = '360deg'
        }
        console.log(elem.style.display)
    }
    function radioFunc(id, s_id){
        let new_s_id
        let new_id

        for(let i = 1; i<7; i++){
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
        $.ajax({
            url: 'http://127.0.0.1:8000/search',
            method: 'post',
            dataType: 'json',
            data: getSearchInfo(),
            success: function(data){
                setItems(data)
                console.log(getSearchInfo())
            },
        });
    }
    function submitFunction(e){
        e.preventDefault()
        console.log(getSearchInfo())
        $.ajax({
            url: 'http://127.0.0.1:8000/search',
            method: 'post',
            dataType: 'json',
            data: getSearchInfo(),
            success: function(data){
                setItems(data)
                
            },
        });
    }
    function getSearchInfo(){
        let info = {
            key_str: '',
            sale: false,
            sort_type: '0',
            min: '50',
            max: '19990'
        }
        let searchInputValue = document.getElementById('searchInput1').value
        let sort = '0'
        for(let i = 1; i<7; i++){
            let new_s_id = 'sradio' + i.toString()
            let elem = document.getElementById(new_s_id)
            if(elem.style.height == '9px'){
                sort = i
                break
            }
        }
        let sliderValue1 = document.getElementById('sliderInput1').value
        let sliderValue2 = document.getElementById('sliderInput2').value

        info.key_str = searchInputValue
        info.sort_type = sort
        info.min = sliderValue1
        info.max = sliderValue2

        return info
    }
    useEffect(() => {
        let elem1 = document.getElementById('sliderInput1')
        let elem2 = document.getElementById('sliderInput2')
        
        elem1.addEventListener('mouseup', () => {
            $.ajax({
                url: 'http://127.0.0.1:8000/search',
                method: 'post',
                dataType: 'json',
                data: getSearchInfo(),
                success: function(data){
                    setItems(data)
                },
            });
        })

        elem2.addEventListener('mouseup', () => {
            $.ajax({
                url: 'http://127.0.0.1:8000/search',
                method: 'post',
                dataType: 'json',
                data: getSearchInfo(),
                success: function(data){
                    setItems(data)
                    console.log(getSearchInfo())
                },
            });
        })


        let progress = document.getElementById('progress')
        let priceInput1 = document.getElementById('priceInput1')
        let priceInput2 = document.getElementById('priceInput2')
        let priceGap = 0
        let arr = [elem1, elem2]
        arr.forEach(input => {
            input.addEventListener('input', (e)=>{
                let minVal = parseInt(arr[0].value)
                let maxVal = parseInt(arr[1].value)
                if(maxVal-minVal < priceGap){
                    if(e.target.id == 'sliderInput1'){
                        arr[0].value = maxVal - priceGap
                    }else{
                        arr[1].value = minVal + priceGap
                    }
                }else{
                    priceInput1.value = minVal
                    priceInput2.value = maxVal
                    progress.style.left = (arr[0].value / (arr[0].max / 100))+'%'
                    progress.style.right = (100-(arr[1].value / (arr[1].max / 100)))+'%'
                    //console.log(progress.style.left, progress.style.right)
                }
            })
        })
        $.ajax({
            url: 'http://127.0.0.1:8000/main',
            method: 'get',
            dataType: 'json',
            success: function(data){
                setItems(data)
            },
        })
    }, [])
    return (
        <div className='search'>
            <div className='searchHeader'>
                    <div className='productsHeader'>  
                        Поиск товаров
                    </div>
                    <div className='productsPath productsPathText'>
                        Магазин<div className='slash productsPathText'>/</div>Поиск: нашлось {items.length}
                    </div>
                    <div className='productsSort'>
                        <div className='sortImgContainer'><img className='sortImg' src={sort_icon}></img></div>
                    </div>
            </div>
            <div className='searchContent'>
                <div className='searchContentAside'>
                    <div id='drop0' className='dropMainContainer'>
                        <div className='searchDropItem' onClick={() => dropFunc('drop0', 'arr0')}>Поиск по ключевому слову<div className='searchArrowContainer'><img id='arr0' className='searchArrow' src={arrow_img}></img></div></div>
                        <div className='searchDropContent'>
                            <div className='searchFakeInput'>
                                <div className='searchGlassContainer'><img src={glass_img} className='searchGlass'></img></div>
                                <form>
                                    <input className='searchInput' id='searchInput1'></input> 
                                    <button type='submit' onClick={submitFunction} style={{display: 'none'}}></button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div id='drop1' className='dropMainContainer'>
                        <div className='searchDropItem' onClick={() => dropFunc('drop1', 'arr1')}>Скидки и акции<div className='searchArrowContainer'><img id='arr1' className='searchArrow' src={arrow_img}></img></div></div>
                        <div className='searchDropContent'>
                            <div className='searchSale' onClick={() => checkFunc('check1')}>
                                <div className='fakeCheckBox' id='check1'></div><div className='searchSaleText'>Сo скидкой</div>
                            </div>
                        </div>
                    </div>
                    <div id='drop2' className='dropMainContainer'>
                        <div className='searchDropItem' onClick={() => dropFunc('drop2', 'arr2')}>Цена<div className='searchArrowContainer'><img id='arr2'className='searchArrow' src={arrow_img}></img></div></div>
                        <div className='searchDropContent' id='drop2'>
                                <div className='priceInputContainerContainer'>
                                    <div className='priceInputContainer'><input className='priceInput' id='priceInput1' value={priceInputMin}></input></div>
                                    <div className='searchDash'>-</div>
                                    <div className='priceInputContainer'><input className='priceInput' id='priceInput2' value={priceInputMax}></input></div>
                                </div>
                                <div className='sliderContainer'>
                                    <div className='slider'>
                                        <div className='greyRange'><div className='progress' id='progress'></div></div>
                                        <input className='sliderInput' type='range' min='50' max='19990' id='sliderInput1' onChange={inputSliderPriceHandlerMin}></input>
                                        <input className='sliderInput' type='range' min='50' max='19990' id='sliderInput2' onChange={inputSliderPriceHandlerMax}></input>
                                    </div>
                                    <div className='sliderText'>
                                        <div>50</div><div>19 990</div>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div id='drop3' className='dropMainContainer'>
                        <div className='searchDropItem' onClick={() => dropFunc('drop3', 'arr3')}>Категория<div className='searchArrowContainer'><img id='arr3' className='searchArrow' src={arrow_img}></img></div></div>
                        <div className='searchDropContent' id='drop3'>
                            <div className='searchCategory'>
                                <div className='fakeCheckBox' id='check2' onClick={() => checkFunc('check2')}></div><div className='searchSaleText'>Коллекции</div>
                            </div>
                            <div className='searchCategory'>
                                <div className='fakeCheckBox' id='check3' onClick={() => checkFunc('check3')}></div><div className='searchSaleText'>Худи</div>
                            </div>
                            <div className='searchCategory'>
                                <div className='fakeCheckBox' id='check4' onClick={() => checkFunc('check4')}></div><div className='searchSaleText'>Футболки</div>
                            </div>
                            <div className='searchCategory'>
                                <div className='fakeCheckBox' id='check5' onClick={() => checkFunc('check5')}></div><div className='searchSaleText'>Верхняя одежда</div>
                            </div>
                            <div className='searchCategory'>
                                <div className='fakeCheckBox' id='check6' onClick={() => checkFunc('check6')}></div><div className='searchSaleText'>Сo скидкой</div>
                            </div>
                        </div>
                    </div>
                    <div id='drop4' className='dropMainContainer'>
                        <div className='searchDropItem' onClick={() => dropFunc('drop4', 'arr4')}>Сортировка<div className='searchArrowContainer'><img id='arr4' className='searchArrow' src={arrow_img}></img></div></div>
                        <div id='drop4' className='searchDropContent'>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio1', 'sradio1')}>
                                <div className='searchRadio' id='radio1'><div className='smallSearchRadio' id='sradio1'></div></div><div className='searchRadioText'>Релевантность</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio2', 'sradio2')}>
                                <div className='searchRadio' id='radio2'><div className='smallSearchRadio' id='sradio2'></div></div><div className='searchRadioText'>Новинки</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio3', 'sradio3')}>
                                <div className='searchRadio' id='radio3'><div className='smallSearchRadio' id='sradio3'></div></div><div className='searchRadioText'>Цена: от низкой к высокой</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio4', 'sradio4')}>
                                <div className='searchRadio' id='radio4'><div className='smallSearchRadio' id='sradio4'></div></div><div className='searchRadioText'>Цена: от высокой к низкой</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio5', 'sradio5')}>
                                <div className='searchRadio' id='radio5'><div className='smallSearchRadio' id='sradio5'></div></div><div className='searchRadioText'>Название: от А до Я</div>
                            </div>
                            <div className='searchRadioContainer' onClick={() => radioFunc('radio6', 'sradio6')}>
                                <div className='searchRadio' id='radio6'><div className='smallSearchRadio' id='sradio6'></div></div><div className='searchRadioText'>Название: от Я до А</div>
                            </div>
                        </div>
                    </div>
                    <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
                  
                </div>
                <div className='searchContentMain'>
                    {items.map(elem => <Item product={elem}/>)}
                </div>
                <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br> <br></br>
            </div>
        </div>
    )
}


export default Search