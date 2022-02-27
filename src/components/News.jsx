import React, {useState, useEffect} from 'react'
import { Select, Row, Col, Typography, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetNewsQuery } from '../features/cryptoNewsAPI';
import { useGetCryptosQuery } from '../features/crytoAPI';

const { Text, Title } = Typography;
const {Option} = Select


const News = ({simplified}) => {
  const count = simplified ? 6 : 11
  const [news, setNews] = useState([]);
  const [category,setCategory]=useState('Cryptocurrency')
  const { data: newsList } = useGetNewsQuery({ newsCategory: category, count });
  const { data } = useGetCryptosQuery(100)
 
  
  useEffect(() => {
    
    setNews(newsList?.value)
  },[newsList])

  return (

    
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            
            className='select-news'
            placeholder='select a Crypto'
            optionFilterProp='children'
            onChange={value => setCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexof(input.toLowerCase()) >= 0}
          >
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map(el => (<Option key={el.name } value={el.name}>{ el.name}</Option>))}
          </Select>
        </Col>
      )}
      {news?.map((el, i) => {
        return (
          <Col xs={24 } sm={ 12} lg={ 8}
           key={i}
          >
            <Card
              hoverable
              className='news-card'
            >
              <a
                href={el.url}
                target='_blank'
                rel="noreferrer">
                <div className='news-image-container'>
                  <Title level={4} className='news-title'>{el.name}</Title>
                  <img style={{maxWidth:'200px',maxHeight:'100px'}} src={el?.image?.thumbnail?.contentUrl }alt='news'/>
                </div>
                <p>
                  {el.description > 100 ? `${el.description.substring(0, 100)}..` : `${el.description}`}
                </p>
                <div className='provider-container'>
                  <div>
                    <Avatar src={el?.provider[0]?.image?.thumbnail?.contentUrl} />
                    <Text className='provider-name'>{el.provider[0]?.name }</Text>
                  </div>
                  <Text>{moment(el.datePublished).startOf('ss').fromNow() }</Text>
                </div>
              </a>
            </Card>        
          </Col>
        )
      })}
    </Row>
  )
}

export default News
