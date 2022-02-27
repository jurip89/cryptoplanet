import React from 'react'
import millify from 'millify';
import { Typography, Col, Row, Statistic } from 'antd';
import { Link } from 'react-router-dom';

import { useGetCryptosQuery } from '../features/crytoAPI';
import {News, Cryprtocurrencies} from './index'
import Loader from './Loader';

const {Title} = Typography

const HomePage = () => {

  const { data, isFetching } = useGetCryptosQuery(15);

  const globalStats = data?.data?.stats;
  
  if(isFetching) return <Loader/>

  

  return (
    <>
      <Title level={2} className='heading'>
        Global Ctypto Stats
      </Title>
      <Row>
        <Col span={12}> <Statistic title='Total Cryptocurrencies' value={globalStats.total }/></Col>
        <Col span={12}> <Statistic title='Total Exchanges' value={millify(globalStats.totalExchanges) }/></Col>
        <Col span={12}> <Statistic title='Total Market Cap' value={millify(globalStats.totalMarketCap) }/></Col>
        <Col span={12}> <Statistic title='Total 24h Volume' value={millify(globalStats.total24hVolume) }/></Col>
        <Col span={12}> <Statistic title='Total Markets' value={ millify(globalStats.totalMarkets)}/></Col>
      </Row>.
      <div className='home-heading-container'>
        <Title className='home-title' level={2 }>Top 15 Cryptocurrencies by rank</Title>
        <Title className='show-more' level={3 }><Link to='/cryptocurrencies'>Show more..</Link></Title>
      </div>
      <Cryprtocurrencies simplified/>
      <div className='home-heading-container'>
        <Title className='home-title' level={2 }>Latest News</Title>
        <Title className='show-more' level={3 }><Link to='/news'>Show more..</Link></Title>
      </div>
      <News simplified/>
    </>
  )
}

export default HomePage
