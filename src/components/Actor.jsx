import React from "react";
import {Link} from "react-router-dom";

 const Actor = ({data}) => (

    <div className="actor">
            <img  src={"https://image.tmdb.org/t/p/w500" + data.profile_path} alt={data.name}/>
            <div className="movieShortInfo">
                <h5>{data.name}</h5>
            </div>
    </div>

);
export default Actor;