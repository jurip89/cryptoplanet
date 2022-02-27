import React, {useState,useEffect} from 'react'
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card, Row, Col, Input} from 'antd'
import Loader from './Loader'
import { useGetCryptosQuery } from '../features/crytoAPI';



const Cryprtocurrencies = ({simplified}) => {
  const count = simplified? 15 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm,setSearchTerm]=useState('')
  
   useEffect(() => {
    

    const filteredData = cryptosList?.data?.coins.filter(el => el.name.toLowerCase().includes(searchTerm.toLowerCase()))
     
    setCryptos(filteredData) 
    
  },[cryptosList,searchTerm])
  
  if (isFetching) return <Loader/>

  
  
 

  return (
    <>
      {!simplified && (
        <div className='search-crypto'>
        <Input placeholder='Search for Cryptos' onChange={e=> setSearchTerm(e.target.value)}/>
      </div>
      )}
      
      <Row gutter={ [32, 32]} className='crypto-card-container'>
        {cryptos?.map(el => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={el.uuid}>
            <Link to={`/cryptocurrencies/${el.uuid}`}>
              <Card
               title={`${el.rank}. ${el.name}`} 
               extra={<img className='crypto-image' src={el.iconUrl } alt=''/>}
                hoverable
              >
                <p><strong>Price:</strong>$ {el.price > .001? millify(el.price): el.price }</p>
                <p><strong>Market-Cap:</strong> {millify(el.marketCap) }</p>
                <p><strong>24h Change:</strong> { el.change }%</p>
                
              </Card>
            </Link>
            </Col>
          )
        )}
    </Row>
    </>
  )
}

export default Cryprtocurrencies
