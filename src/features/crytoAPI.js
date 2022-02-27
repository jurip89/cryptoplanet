import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
    'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_NEWS_API_KEY
};

const baseUrl = 'https://coinranking1.p.rapidapi.com';

const createRequest = url =>({url,headers:cryptoApiHeaders})

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getCryptos: builder.query({
            query:(count)=> createRequest(`/coins?limit=${count}`,)
        }),
        getCoin: builder.query({
            query:(id)=> createRequest(`coin/${id}`,)
        }),
        getCoinHistory: builder.query({
            query:({coinId,timePeriod})=> createRequest(`coin/${coinId}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`,)
        })
    })
})

export const {
    useGetCryptosQuery,
    useGetCoinQuery,
    useGetCoinHistoryQuery
} = cryptoApi;