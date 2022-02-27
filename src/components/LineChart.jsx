import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Row, Col, Typography } from 'antd';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = ({ coinHistory, coinPrice, coinName }) => {
  const coinPriceChart = [];
  const coinTimeStamp = [];

    
  for (let i = 0; i < coinHistory?.data?.history?.length; i+=3){
    coinPriceChart.unshift(coinHistory?.data?.history[i].price)
    coinTimeStamp.unshift(new Date(coinHistory?.data?.history[i].timestamp *1000).toLocaleDateString())
  }

    const data = {
    labels: coinTimeStamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPriceChart,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        tension:0.1
      },
    ],
  };

  const options = {
    scales: {
      y: 
      {
            beginAtZero: true
            
      }
     
      
    },
  };

 

  return (
    <>
      <Row className='chart-header'>
        <Typography.Title level={2} className='chart-title'>{ coinName} Price Chart</Typography.Title>
        <Col className='price-container'>
          <Typography.Title className='price-change' level={5}>{coinHistory?.data?.change }%</Typography.Title>
          <Typography.Title className='current-price' level={5}>Current {coinName} Price: $ { coinPrice}</Typography.Title>
        </Col>
      </Row> 
      <Line data={data} options={options }/> 
    </>
  )
}

export default LineChart
