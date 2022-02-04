import React from 'react';
import { Select,Typography,Row,Col,Avatar,Card } from 'antd';
import moment from 'moment';

import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';

const {Title,Text} = Typography;
const {Options} = Select;

const News = ({simplified}) => {
    const {data:cryptoNews} = useGetCryptoNewsQuery({type:'CryptoCurrency',count:10})
    console.log(cryptoNews);
    return (
        <div>
            News
        </div>
    )
}

export default News;