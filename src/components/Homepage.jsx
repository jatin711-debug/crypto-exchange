import React from 'react';
import millify from 'millify';
import { Typography, Row, Col, Statistic } from 'antd';
import {Link} from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import {Cryptocurrencies,News} from '../components';
import Loader from './Loader';
const { Title } = Typography;
const Homepage = () => {
    const {data,isFetching} = useGetCryptosQuery(10);
    const globalStats  = data?.data?.stats;
    if(isFetching) return <Loader />;
    
    return (
        <>
            <Title level={2} className="heading">Global Crypto Stats</Title>
            <Row gutter={[16, 16]}>
                <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total} /></Col>
                <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
                <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
                <Col span={12}><Statistic title="Total 24h Valume" value={millify(globalStats.total24hVolume)} /></Col>
                <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} /></Col>
            </Row>
            <div>
                <Title level={2} className="home-title">Top 10 Cryptos Trending</Title>
                <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
            </div>
            <Cryptocurrencies simplified/>
            <div>
                <Title level={2} className="home-title">Latest Crypro News</Title>
                <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
            </div>
            <News simplified/>
        </>
    )
}

export default Homepage;
