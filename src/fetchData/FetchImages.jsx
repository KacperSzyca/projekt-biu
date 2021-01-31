import React, { useState } from 'react'
import axios from 'axios'
import "react-image-gallery/styles/css/image-gallery.css";

export default function FetchImages(id) {
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");
    const [images, setImages] = useState([])



    useState(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/movie/' + id + '/images',
            params: {api_key: api_key},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            console.log(res.data.backdrops)
            setImages(res.data.backdrops.map(data => ({
                original: `https://image.tmdb.org/t/p/w1280${data.file_path}`,
                thumbnail: `https://image.tmdb.org/t/p/w200${data.file_path}`
            })))
        }).catch(e => {
            if (axios.isCancel(e)) return
        })
        return () => cancel()
    })

    return {  images }
}
