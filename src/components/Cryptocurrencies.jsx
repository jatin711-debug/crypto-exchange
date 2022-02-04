import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import millify from 'millify';
import {Card, Row, Col, Input} from 'antd';
import {useGetCryptosQuery} from '../services/cryptoApi';
import Loader from './Loader';

const Cryprocurrencies = ({ simplified }) => {
    const count = simplified ? 10:50;
    const { data:cryptosList,isFetching } = useGetCryptosQuery(count);
    const [cryptos,setCryptos] = useState( [] );
    const [searchTerm,setSearchTerm] = useState('');

    useEffect(() =>{
        const filterList = cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filterList);
    },[cryptosList,searchTerm])

    if(isFetching) return <Loader />;
    return (
        <>
            {(!simplified) && (
                <div className="search-crypto">
                    <Input placeholder="Search Crypto Currency" onChange={(e)=> setSearchTerm(e.target.value)} />
                </div>
            )}
            <Row gutter={[3,3]} className="crypto-card-container">
                {cryptos?.map((crypto) =>(
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
                        <Link key={crypto.id} to={`/crypto/${crypto.id}`}>
                            <Card key={crypto.id}
                                title={`${crypto.rank}. ${crypto.name}`}
                                    extra={<img className="crypto-image" src={crypto.iconUrl} alt="img"/>}    
                                        hoverable
                                            >
                            <p><b>Price : </b>${(parseFloat(crypto.price).toFixed(8))}</p>
                            <p>Market Cap: {millify(crypto.marketCap)}</p>
                            <p>Daily Change : {millify(crypto.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryprocurrencies;