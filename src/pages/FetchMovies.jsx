import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FetchMovies(query, pageNumber, url) {
    const [movies, setMovies] = useState([])
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");

    useEffect(() => {
        setMovies([])
    }, [query])


    useEffect(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/' +  url,
            params: {  api_key: api_key, page: pageNumber, query: query},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setMovies(prevMovies => {
                return [...new Set([...prevMovies, ...res.data.results])];
            });
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    }, [ query, pageNumber, url])

    return {  movies }
}