import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function FetchCredits(id) {
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);


    useState(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + id + '/credits',
            params: {api_key: api_key},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setCast(res.data.cast)
            setCrew(res.data.crew)
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    })

    return {  cast, crew }
}