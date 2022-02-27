import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
		"x-rapidapi-key": "5906d829d6msh12c66269c309770p16946bjsn3321bda25949"
};

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';

const createRequest = url => ({ url, headers:cryptoNewsApiHeaders})

export const newsApi = createApi({
    reducerPath: 'newsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: builder => ({
        getNews: builder.query({
            query: ({newsCategory,count}) => createRequest(`/news/search?q=${newsCategory}&count=${count}&freshness=Day&textFormat=Raw&safeSearch=Off`)
        })
    })
});

export const {
    useGetNewsQuery,
} = newsApi;