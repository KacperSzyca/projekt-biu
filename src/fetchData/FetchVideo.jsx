import React, { useState } from 'react'
import axios from 'axios'

export default function FetchVideo(id) {
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");
    const [video, setVideo] = useState([])

    useState(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + id + '/videos',
            params: {api_key: api_key},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setVideo('https://www.youtube.com/watch?v=' + res.data.results[0].key)
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    })

    return {  video }
}