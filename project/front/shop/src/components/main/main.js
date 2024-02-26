import { Link } from 'react-router-dom';
import './main.css'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { DropNavbar } from './drop_navbar';
import { SlideBanner } from '../../elements/slider_banner/slider_banner';
function Main(props){
    let dispatch = useDispatch()
    let page = document.querySelector('body');
    let count = useSelector(store => store.cart)
    window.addEventListener('scroll', function() {
        if(window.scrollY > 300){
            document.getElementById('topDispBtn').style.opacity = 1
            document.getElementById('mainSearchContainer').style.opacity = 0
        }else{
            document.getElementById('topDispBtn').style.opacity = 0
            document.getElementById('mainSearchContainer').style.opacity = 1
        }
      });  
    function topFunc(){
        window.location.href='#topAnchor'
    }
    function dropNav(){
        document.getElementById('dropNavbar1').style.display = 'block'
        document.getElementById('dropNavbar1').style.maxHeight = '1000px'
        document.getElementById('mainContainer1').style.display = 'none'
    }
    let tg_svg_url = 'https://www.svgrepo.com/show/388724/telegram.svg'
    let inst_svg_url = 'https://www.svgrepo.com/show/364604/instagram-logo-fill.svg'
    let yt_svg_url = 'https://www.iconpacks.net/icons/1/free-youtube-icon-123-thumb.png'
    let vk_svg_url = 'https://www.iconpacks.net/icons/1/free-vk-icon-120-thumb.png'
    let glass_img = 'https://cdn-icons-png.flaticon.com/512/622/622669.png'
    let arrow_img = 'https://cdn-icons-png.flaticon.com/512/54/54785.png'
    return (
        <div>
        <DropNavbar/>
        <div className='mainContainer' id='mainContainer1'>
            <div className="main">
                <div className="navbarContainer" id='topAnchor'>
                    <div className='navbar'>
                        <div className='navbarLogoContainer'>
                            <img className='navbarLogo' id='navbarLogo1'src='https://static.tildacdn.com/tild3336-6465-4263-a466-663561623732/photo.jpg'></img>
                        </div>
                        <div className='navbarElementsContainer'>
                            <div className='navbarElements'>
                                <ul className='navbarUl'>
                                    <li className='navbarLi'><Link to='/main' style={{textDecoration: 'none', color: 'black'}}><div className='mainTextLi'>ГЛАВНАЯ</div></Link></li>
                                    <li className='navbarLi'><Link to='/sale' style={{textDecoration: 'none', color: 'black'}}><div className='mainTextLi'>SALE</div></Link></li>
                                    <li className='dropItem' id='dropItem1'><div id='dropName1' className='dropName'>КОЛЛЕКЦИИ</div><div className='arrowDownContainer'><img className='arrowDown'src={arrow_img}></img></div>
                                        <div className='dropContent' id='dropContent1'>
                                            <ul className='dropUl'>
                                                <li className='dropLi'><Link to='/cmh' className='link'>CMH</Link></li>
                                                <li className='dropLi'><Link to='/booker' className='link'>BOOKER</Link></li>
                                                <li className='dropLi'><Link to='/vsrap' className='link'>VSRAP</Link></li>
                                                <li className='dropLi'><Link to='/gspd' className='link'>GSPD</Link></li>
                                                <li className='dropLi'><Link to='/snailkick' className='link'>SNAILKICK</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className='dropItem' id='dropItem2'><div id='dropName2' className='dropName'>ОДЕЖДА</div><div className='arrowDownContainer'><img className='arrowDown'src={arrow_img}></img></div>
                                        <div className='dropContent' id='dropContent2'>
                                                <ul className='dropUl'>
                                                    <li className='dropLi'><Link to='/hoodie' className='link'>ХУДИ</Link></li>
                                                    <li className='dropLi'><Link to='/tshirts' className='link'>ФУТБОЛКИ</Link></li>
                                                    <li className='dropLi'><Link to='/sweaters' className='link'>СВИТШОТЫ</Link></li>
                                                    <li className='dropLi'><Link to='/out_cloth' className='link'>КУРТКИ</Link></li>
                                                </ul>
                                        </div>
                                    </li>
                                    <li className='dropItem' id='dropItem3'><div id='dropName3' className='dropName'>АКСЕССУАРЫ</div><div className='arrowDownContainer'><img className='arrowDown'src={arrow_img}></img></div>
                                        <div className='dropContent' id='dropContent3'>
                                            <ul className='dropUl'>
                                                <li className='dropLi'><Link to='/scarves' className='link'>Шарфы</Link></li>
                                            </ul>
                                        </div>
                                    </li>
                                    <li className='navbarLi'><Link to='/certificate' style={{textDecoration: 'none', color: 'black'}}><div className='mainTextLi'>ПОДАРОЧНЫЕ СЕРТИФИКАТЫ</div></Link></li>
                                    <li className='navbarLi'><Link to='/delivery_info' style={{textDecoration: 'none', color: 'black'}}><div className='mainTextLi'>ДОСТАВКА И ОПЛАТА</div></Link></li>
                                    <li className='navbarLi'><Link to='/account' style={{textDecoration: 'none', color: 'black'}}><div className='mainTextLi'>ЛИЧНЫЙ КАБИНЕТ</div></Link></li>
                                    <li className='navbarLi'><Link to='/contacts' style={{textDecoration: 'none', color: 'black'}}><div className='mainTextLi'>КОНТАКТЫ</div></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className='secondNavbar'>
                            <img className='navbarLogo' src='https://static.tildacdn.com/tild3336-6465-4263-a466-663561623732/photo.jpg'></img>
                            <div className='burgerMenuIcon' onClick={dropNav}> 
                                <div className='burgerVector'></div>
                                <div className='burgerVector' id='burgerVector2'></div>
                                <div className='burgerVector'></div>
                            </div>
                        </div>
                  
                    </div>
                </div>
                <div className="slideBanner"><SlideBanner/></div>
                <div className="contentContainer">
                    <div className='content' id='content1' style={props.stl}>
                        <div className='fixedBtnCont'>
                            <div className='cartCounter'>{count}</div>
                            <div className="topBtn fixedBtn ikonAnim cursor_focus" id='topDispBtn' onClick={topFunc}><img className='cartIcon vkIcon' src='https://mywebicons.ru/i/png/7ca5ca499b1081df81cdd489c5f75f4e.png'></img></div>
                            <Link to='/cart'><div className="cartBtn fixedBtn ikonAnim cursor_focus"><img className='cartIcon' src='https://static.thenounproject.com/png/1094020-200.png'></img></div></Link>
                            <div className="vkBtn fixedBtn ikonAnim cursor_focus"><img className='cartIcon vkIcon vkIconImg' src='https://seeklogo.com/images/V/vk-logo-58AFA43F16-seeklogo.com.png'></img></div>
                        </div>
                        <div className='mainSearchContainer' id='mainSearchContainer'>
                                <Link to='/search'><div className='searchIconContainer'><img className='searchIcon' src={glass_img}></img></div></Link>
                                <div className='manyConvert'>₽<div className='arrowDownContainer'><img className='arrowDown'src={arrow_img}></img></div></div>
                        </div>
                        {props.component}
                    </div>
                </div>
                <div className="footerContainer">
                    <div className='footer'>
                        <div className='footerCol footerLogoContainer'>
                            <img className='footerLogo' src='https://thumb.tildacdn.com/tild6266-3333-4466-b963-323135386561/-/resize/240x/-/format/webp/Group_15.png'></img>
                            <div className="radiusSocial"><img src={vk_svg_url} className="iconImg"></img></div>
                            <div className="radiusSocial"><img src={inst_svg_url} className="iconImg"></img></div>
                            <div className="radiusSocial"><img src={yt_svg_url} className="iconImg"></img></div>
                            <div className="radiusSocial"><img src={tg_svg_url} className="iconImg"></img></div>
                            <div className='footerLogoText'>© 2024 VSRAP</div>
                        </div>
                        <div className='footerCol footerUl'>
                            <div className='footerUlHeader'>МАГАЗИН</div>
                            <div className='footerUlElement'>Коллекции</div>
                            <div className='footerUlElement'>SALE</div>
                            <div className='footerUlElement'>Одежда</div>
                            <div className='footerUlElement'>Аксессуары</div>
                            <div className='footerUlElement'>Подарочные сертификаты</div>
                        </div>
                        <div className='footerCol footerUl'>
                            <div className='footerUlHeader'>Информация</div>
                            <div className='footerUlElement'>Личный кабинет</div>
                            <div className='footerUlElement'>Для артиста</div>
                            <div className='footerUlElement'>Публичная оферта</div>
                            <div className='footerUlElement'>Обработка персональных данных</div>
                            <div className='footerUlElement'>Контакты</div>
                        </div>
                        <div className='footerCol footerInfo'>
                            <div className='footerInfoText'>
                                ИП Ганин Максим Александрович<br></br>
                                ИНН: 744410767676<br></br>
                                ОГРНИП: 317745600008299
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <div className='footerInfoElement'>shop@vsrap.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
export default Main