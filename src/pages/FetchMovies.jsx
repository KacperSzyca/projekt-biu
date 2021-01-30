import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FetchMovies(pageNumber) {
    const [movies, setMovies] = useState([])
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");


    useEffect(() => {

        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/popular',
            params: {  api_key: api_key, page: pageNumber},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setMovies(prevMovies => {
                console.log(res.data.results);
                const newMovies = movies.concat(res.data.results);
                return newMovies;
            });

        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    }, [ pageNumber])

    return {  movies }
}