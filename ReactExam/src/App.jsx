import React from 'react';
import MainSection from './cmps/MainSection.jsx'
import Aside from './cmps/Aside.jsx'
import Footer from './cmps/Footer.jsx'

const App = () => {
    return (
    <div className="App">
        <div className="first-row">
            <MainSection />
            <Aside />
        </div>
        <Footer />
    </div>);
}

export default App;