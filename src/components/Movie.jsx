import React from "react";
import {Link} from "react-router-dom";

 const Movie = ({data}) => (

     <div className="movie">
         <Link to={"/movieInfo/" + data.id} style={{ textDecoration: 'none' }}>
         <img  src={"https://image.tmdb.org/t/p/w1280" + data.poster_path} alt={data.title}/>
            <div className="movieShortInfo">
                <h3>{data.title}</h3>
                <div className='votes'>
                    <h5>Rating: {data.vote_average}</h5> <h7>Votes count: {data.vote_count}</h7>
                </div>
            </div>
         </Link>
     </div>

 );
export default Movie;