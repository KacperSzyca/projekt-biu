import React, {useState} from "react";
import axios from 'axios'

 const Actor = ({data}) => (

    <div className="actor">
            <a href={`https://www.themoviedb.org/person/${data.id}`}>
            <img  src={"https://image.tmdb.org/t/p/w500" + data.profile_path} alt={data.name}/>
            <div className="movieShortInfo">
                {/*{FetchMovies(data.id).person.popularity > 10 ?  <h5 style={{color: "gold"}}>{data.name}</h5>: <h5>{data.name}</h5>}*/}
                <h5>{data.name}</h5>
                {FetchMovies(data.id).person.popularity > 10 ?  <h5 style={{color: "gold", fontSize: 15}}>Popular</h5>: ''}
            </div>
            </a>
    </div>

);
export default Actor;


 function FetchMovies(id) {
    const [person, setPerson] = useState([])
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");

    useState(() => {
        let cancel
        axios({
            method: 'GET',
            url: 'https://api.themoviedb.org/3/person/' +  id,
            params: {  api_key: api_key},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setPerson(res.data)
        }).catch(e => {
        if (axios.isCancel(e)) return
     })
     return () => cancel()
    })

    return {  person }
}