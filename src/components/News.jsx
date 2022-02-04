import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';
import { Select,Typography,Row,Col,Avatar,Card } from 'antd';
import {useGetCryptosQuery} from '../services/cryptoApi';
import React, {useState} from 'react';
import Loader from './Loader';
import moment from 'moment';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';
const {Title,Text} = Typography;
const {Option} = Select;

const News = ({simplified}) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
    const { data } = useGetCryptosQuery(100);
    const {data:cryptoNews} = useGetCryptoNewsQuery({type:newsCategory,count:simplified ? 6 : 20});

    if(!cryptoNews?.value) return <Loader />;

    return (
        <Row gutter={[4,4]}>
            {!simplified && (
            <Col span={24}>
                <Select
                    showSearch
                    className="select-news"
                    placeholder="Select a Crypto"
                    optionFilterProp="children"
                    onChange={(value) => setNewsCategory(value)}
                    filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                    <Option value="Cryptocurency">Cryptocurrency</Option>
                    {data?.data?.coins?.map((currency) => <Option value={currency.name}>{currency.name}</Option>)}
                </Select>
            </Col>
      )}
            {cryptoNews?.value.map((data,i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className="news-card">
                        <a href={data.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{data.name}</Title>
                                <img src={data?.image?.thumbnail?.contentUrl || demoImage} alt="news"/>
                            </div>
                            <p>{data?.description > 100 ? `${data.description.substring(0,100)}`: data.description }</p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={data?.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="P"/>
                                    <Text className="provider-name">{data.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(data.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News;