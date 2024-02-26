import './contacts.css'

export function Contacts(){
    return (<div>
        <img className='contactImg' src='https://optim.tildacdn.com/tild6432-3262-4339-b330-303332623636/-/format/webp/1.png'></img>
        <div className='contactMainContainer'>
            <div className='contactMain'>
                <div className='contactCol'>
                    <div className='contactHeader'>Магазин в Санкт-Петербурге</div>
                    <div className='contactLink'>Лиговский проспект 74</div>
                    <div className='contactText'>Лофт-проект "ЭТАЖИ", второй двор</div>
                    <div className='contactText'>11:00 - 21:00</div>
                    <div className='contactText'>пн-вс</div>
                    <div className='contactGreyText'></div>
                </div>
                <div className='contactCol'>
                    <div className='contactHeader'>Магазин в Москве</div>
                    <div className='contactLink'>Большая Новодмитровская 36/2</div>
                    <div className='contactText'>Дизайн-завод "FLACON", третий этаж</div>
                    <div className='contactText'>11:00 - 21:00</div>
                    <div className='contactText'>пн-вс</div>
                    <div className='contactGreyText'></div>
                </div>
                <div className='contactCol'>
                    <div className='contactHeader'>Вопросы о заказах и товарах:</div>
                    <div className='contactLink'>shop@vsrap.com</div>
                    <br></br>
                    <div className='contactHeader'>Производство мерчендайза:</div>
                    <div className='contactLink'>wear@vsrap.com</div>
                    <br></br>
                    <div className='contactLink'>Instagram/ VK / Telegram / TG support</div>
                    <br></br>
                    <br></br>
                    <div className='contactGreyText'>ИП Ганин Максим Александрович</div>
                    <div className='contactGreyText'>ИНН: 744410767676</div>
                    <div className='contactGreyText'>ОГРНИП: 317745600008299</div>
                    <div className='contactGreyText'>Юр. адрес: Россия, Ленинградская обл., Гатчинский р-н, д. Химози, линия 3-я, д. 1</div>
                </div>
            </div>
        </div>
    </div>)
}