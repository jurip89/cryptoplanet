import React,{useState} from 'react'
import HTMLReactParser from 'html-react-parser';
import millify from 'millify';
import { useParams } from 'react-router-dom';
import { Col,Row,Typography,Select } from 'antd';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, CheckOutlined, NumberOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { useGetCoinQuery, useGetCoinHistoryQuery } from '../features/crytoAPI';
import {LineChart} from './index'
import Loader from './Loader';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams()
  const [timePeriod, setTimePeriod] = useState('7d');
  
  const { data, isFetching } = useGetCoinQuery(coinId);
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timePeriod });
  
  const cryptoDetails = data?.data?.coin;
  
  console.log('History: ',coinHistory)

  if (isFetching) return <Loader/>
  
  const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

  const stats = [
    { title: 'Price: ', value: `$ ${cryptoDetails.price && (cryptoDetails.price > .01)? millify(cryptoDetails.price): cryptoDetails.price}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails.rank, icon: <NumberOutlined /> },
    { title: 'Change', value: `${cryptoDetails.change} %`, icon: <ThunderboltOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails.marketCap && millify(cryptoDetails.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails.allTimeHigh.price> .01?millify(cryptoDetails.allTimeHigh.price):cryptoDetails.allTimeHigh.price}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails.supply.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Total Supply', value: cryptoDetails.supply.total?`$ ${millify(cryptoDetails.supply.total)}`:`???`, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `${cryptoDetails.symbol} ${millify(cryptoDetails.supply.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];



  return (

   
    <Col className='coin-detail-container'>
      <Col className='coin-header-ccontainer'>
      <Title level={2} className='coin-name'>
      {cryptoDetails.name} ({cryptoDetails.symbol})
      </Title>
      <p>{cryptoDetails.name } live price in USD, view statistics, market cap and more</p>
     
      </Col>
      <Select
        defaultValue='7d'
        className='select-timeperiod'
        placeholder='Select time period'
        onChange={value => setTimePeriod(value)}
      >
        {time.map(el => <Option key={el} value={el}>{el }</Option>
        
        )}
      </Select>

      <LineChart coinHistory={coinHistory} coinPrice={cryptoDetails.price} coinName={ cryptoDetails.name}/>
      <Col className='stats-container'>
        <Col className='coin-value-statistics'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              {cryptoDetails.name} Value Statistics
            </Title>
            <p>An overview showing the stats of {cryptoDetails.name }</p>
          </Col>
          {stats.map(({ icon, title, value }) => (
            <Col className='coin-stats' key={ value}>
              <Col className='coin-stats-name'>
                <Text>{icon }</Text>
                <Text>{title }</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
        <Col className='other-stats'>
          <Col className='coin-value-statistics-heading'>
            <Title level={3} className='coin-details-heading'>
              Other Statistic
            </Title>
            <p>An overview showing other relevant statistics</p>
          </Col>
          {genericStats.map(({ icon, title, value },i) => (
            <Col className='coin-stats' key={i}>
              <Col className='coin-stats-name'>
                <Text>{icon }</Text>
                <Text>{title }</Text>
              </Col>
              <Text className='stats'>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>
      <Col className='coin-desc-link'>
        <Row className='coin-desc'>
          <Title level={3} className='coin-details-heading'>
            What is {cryptoDetails.name}?
            </Title>
            {HTMLReactParser(cryptoDetails.description)}
          
        </Row>
        <Col className='coin-links'>
          <Title level={4} className='coin-details-heading'>
            {cryptoDetails.name } Links:
          </Title>
          {cryptoDetails.links.map(el => (
            <Row className='coin-link' key={el.url}>
              <Title level={5} className='link-name'>
                {el.name }
              </Title>
              <a href={el.url} target='_blank' rel="noreferrer">{ el.url}</a>
            </Row>
          ))}
        </Col>
      </Col>
    </Col>
  )
}

export default CryptoDetails
