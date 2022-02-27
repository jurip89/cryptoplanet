import React from 'react';
import {  Route, Routes,Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { NavBar,Exchanges,CryptoDetails,Cryprtocurrencies,News,HomePage } from './components/index'
import './App.css'

import 'antd/dist/antd.css';


function App() {
  return (
    <div className="app">
      <div className='navbar'>
        <NavBar/>
      </div>
      <div className='main'>
          <Layout>
            <div className='routes'>
              <Routes>
                <Route exact path='/' element={<HomePage/> }/>
                <Route path='/exchanges' element={<Exchanges/> }/>
                <Route path='/news' element={<News/> }/>
                <Route path='/cryptocurrencies' element={<Cryprtocurrencies/> }/>
                <Route path='/cryptocurrencies/:coinId' element={<CryptoDetails/> }/>
              </Routes>
           </div>
        </Layout>
      
        <div className='footer' >
          <Typography.Title level={5 } style={{color:'#eee', textAlign:'center'}}> 
          Crypto Planet <br/> All rigth reserved
          </Typography.Title> 
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
