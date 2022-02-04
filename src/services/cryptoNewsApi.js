import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
        'x-bingapis-sdk': 'true',
        'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
        'x-rapidapi-key': '713f7536d6msh175d2b3677bbed6p162f3ajsn363d8c68869d'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com/news';
const createRequest = (url) => ({url,headers: cryptoNewsApiHeaders});

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: (category) => createRequest(`/search?q=${category.type}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${category.count}`)
        })
    })
});

export const {
    useGetCryptoNewsQuery
} = cryptoNewsApi;