import { useEffect } from 'react'
import Item from '../item/item'
import Products from '../products/products'
import './main_page.css'
import { Link } from 'react-router-dom'

export function MainPage(props){
    useEffect(() => {
        let elem
        for(let i = 1; i<=3; i++){
            elem = document.getElementById(`opacityDiv${i}`)
            console.log(elem)
            if(elem){
                document.getElementById(`opacityDiv${i}`).addEventListener('mouseover', () => {
                    document.getElementById(`opacityDiv${i}`).style.opacity = '0.5'
                    document.getElementById(`opacityDivText${i}`).style.opacity = '1'
                    console.log(elem)
                })
                elem.addEventListener("mouseout", () => {
                    document.getElementById(`opacityDiv${i}`).style.opacity = '0'
                    document.getElementById(`opacityDivText${i}`).style.opacity = '0'
                    console.log('out')
                })
            }
        }
    }, [])

    return <div>
        <div className="mainPhotoGroup12">
            <Link to='/vsrap'>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <div className="onePhotoOnLineContainer12">
                        <div className='opacityDivTextContainer'>
                            <div className='opacityDivText' id='opacityDivText1'>VSRAP</div>
                        </div>
                        <div className='opacityDiv' id='opacityDiv1'></div>  
                        <img src ="https://optim.tildacdn.com/tild3735-3030-4262-b137-303531326239/-/format/webp/--3-1_1.png" className='onePhotoOnLine12'></img>
                    </div>
                </div>
            </Link>
            <Link to='/cmh'>
            <div style={{display: 'flex', justifyContent: 'center', backgroundColor: 'black'}}>
                <div className="onePhotoOnLineContainer12" style={{backgroundColor: 'black'}}>
                    <div className='opacityDivTextContainer'>
                        <div className='opacityDivText' id='opacityDivText2'>CMH</div>
                    </div>
                    <div className='opacityDiv' id='opacityDiv2'></div> 
                    <img src ="https://optim.tildacdn.com/tild3337-6333-4333-b165-343264363933/-/format/webp/2023-12-14-211124_1.png" className='onePhotoOnLine12'></img>
                </div>
            </div>
            </Link>
            <Link to='/vsrap'>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className="onePhotoOnLineContainer12">
                    <div className='opacityDivTextContainer'>
                        <div className='opacityDivText' id='opacityDivText3'>UNIVERSITY</div>
                    </div>
                    <div className='opacityDiv' id='opacityDiv3'></div> 
                    <img src ="https://optim.tildacdn.com/tild3130-3437-4432-b663-376264623836/-/format/webp/43_1.png" className='onePhotoOnLine12'></img>
                </div>
            </div>
            </Link>

        </div>
        <div className="contentContainer">
            <div className='content'>
                <div className='mainPageHeader12'>Коллекции</div>

                <div className='collectionsList'>
                    <Link to='/vsrap'>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild3464-6630-4935-b630-323832343364/-/format/webp/3375760519.jpg'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>VSRAP</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/cmh'>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild3262-6365-4038-a535-373230656433/-/format/webp/photo.png'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>CMH</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to=''>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild6531-6330-4133-a539-663761636336/-/resize/600x600/-/format/webp/_.jpg'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>АНТИХАЙп</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to=''>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild3363-3638-4037-b063-363766396535/-/resize/600x600/-/format/webp/_.jpg'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>ЖАК ЭНТОНИ</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to=''>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild6630-6538-4561-a464-316535663337/-/resize/600x600/-/format/webp/2023-08-14_190820.jpg'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>LIDA</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to=''>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild3964-3639-4563-a632-326330646561/-/resize/600x600/-/format/webp/esf_1.png'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>DEAD BLONDE</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to='/gspd'>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild6238-6339-4563-a538-663261383563/-/resize/600x600/-/format/webp/2023-08-14_192111.jpg'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>GSPD</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <Link to=''>
                        <div className='collectionsListElem'>
                            <div className='collectionsListElemImgContainer'>
                                <img className='collectionsListElemImg' src='https://optim.tildacdn.com/tild3565-6138-4833-b639-386533666363/-/resize/600x600/-/format/webp/1H1A8611-Edit_.jpg'></img>
                                <div className='collectionsListElemImgText'>
                                    <div className='collectionsListElemImgTextInner'>ЮГ 404</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='viewAllBtnContainer'>
                    <div className='containerForBlik'>
                        <div className='innerForBlik'>
                            <div className='blik'></div>
                        </div>
                        <button className='viewAllBtn'>Смотреть все</button>
                    </div>
                </div>
                <div className='mainPageProductsH'>Новые товары</div>
                <Products products={props.products}></Products>
            </div>
        </div>
    </div>
}