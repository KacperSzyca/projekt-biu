import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FetchDetails(id) {
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");
    const [movie, setMovie] = useState([])
    const [genres, setGenres] = useState([]);


    useState(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + id,
            params: {api_key: api_key},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setMovie(res.data);
            setGenres(res.data.genres)
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    })

    return {  movie, genres }
}