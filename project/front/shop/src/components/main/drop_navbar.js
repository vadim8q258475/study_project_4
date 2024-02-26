import './drop_navbar.css'


export function DropNavbar(){
    let tg_svg_url = 'https://www.svgrepo.com/show/388724/telegram.svg'
    let inst_svg_url = 'https://www.svgrepo.com/show/364604/instagram-logo-fill.svg'
    let yt_svg_url = 'https://www.iconpacks.net/icons/1/free-youtube-icon-123-thumb.png'
    let vk_svg_url = 'https://www.iconpacks.net/icons/1/free-vk-icon-120-thumb.png'
    let glass_img = 'https://cdn-icons-png.flaticon.com/512/622/622669.png'
    let arrow_img = 'https://cdn-icons-png.flaticon.com/512/54/54785.png'
    function dropClose(){
        document.getElementById('dropNavbar1').style.maxHeight = '0px'
        document.getElementById('dropNavbar1').style.display = 'none'
        document.getElementById('mainContainer1').style.display = 'block'
    }
    return (
        <div className='dropNavbar' id='dropNavbar1'>
            <div className='dropNavbarHeader'>
                <img className='dropNavbarHeaderImg' src='https://static.tildacdn.com/tild3962-3835-4565-b065-373265313166/Group_15.png'></img>
                <img onClick={dropClose} className='dropNavbarCrossImg' src='https://www.pngfind.com/pngs/m/193-1931093_cross-icon-png-black-cross-png-transparent-png.png'></img>
            </div>
            <div className='dropNavbarItem'>
                ГЛАВНАЯ
            </div>
            <div className='dropNavbarItem'>
                SALE
            </div>
            <div className='dropNavbarItem'>
                GIFT PACKS
            </div>
            <div className='dropNavbarItem'>
                КОЛЛЕКЦИИ
                <img className='dropNavbarArrow' src={arrow_img}></img>
            </div>
            <div className='dropNavbarItem'>
                ОДЕЖДА
                <img className='dropNavbarArrow' src={arrow_img}></img>
            </div>
            <div className='dropNavbarItem'>
                АКСЕССУАРЫ
                <img className='dropNavbarArrow' src={arrow_img}></img>
            </div>
            <div className='dropNavbarItem'>
                ПОДАРОЧНЫЕ СЕРТИФИКАТЫ
            </div>
            <div className='dropNavbarItem'>
                ДОСТАВКА И ОПЛАТА
            </div>
            <div className='dropNavbarItem'>
                ЛИЧНЫЙ КАБИНЕТ
            </div>
            <div className='dropNavbarItem'>
                АРТИСТАМ
            </div>
            <div className='dropNavbarItem'>
                КОНТАКТЫ
            </div>
            <div className='radiusSocialContainer1'>
                <div className="radiusSocial1"><img src={vk_svg_url} className="iconImg1"></img></div>
                <div className="radiusSocial1"><img src={inst_svg_url} className="iconImg1"></img></div>
                <div className="radiusSocial1"><img src={yt_svg_url} className="iconImg1"></img></div>
                <div className="radiusSocial1"><img src={tg_svg_url} className="iconImg1"></img></div>
            </div>
        </div>
    )
}