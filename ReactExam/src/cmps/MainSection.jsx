import React from 'react';

import progBar from '../assests/imgs/progbar.png'
import battery from '../assests/imgs/battery.png'
import world from '../assests/imgs/world.png'

export default () => {
    return (
        <div className="main-section container">


            <header className="header-wrapper row space-around">

                <div className="sub-header-wrapper">
                    <div className="row">
                        <h2>ACTIVATED</h2>
                        <img src={progBar} alt="Progress Bar" />
                    </div>

                    <div className="nums-wrapper">
                        <span>0. 1. 1. 2. 5. 8. 64. 6. 2. 2. 3. 910. 423. 中文翻译手机版 中文翻译手机版</span>
                    </div>

                </div>

                <div className="map-interiactive-wrapper">
                    <h3>WORLD MAP</h3>
                    <h3>INTERACTIVE</h3>
                </div>

            </header>



            <main className="main-content space-around">

                <img src={battery} className="battery" alt="Battery" />

                <img src={world} className="world" alt="World" />

                <div className="details-wrapper col space-between">


                    <div className="detail">
                        <h3>01 AS</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus iusto</p>
                    </div>

                    <div className="detail-big">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem hic ipsa laborum doloribus iste reiciendis? Aliquid vel vitae accusamus animi sequi sit, repudiandae impedit nihil cum voluptatibus</p>
                    </div>

                    <div className="detail">
                        <h3>02 AO</h3>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus iusto</p>
                    </div>

                </div>

            </main>

        </div>
    )
}