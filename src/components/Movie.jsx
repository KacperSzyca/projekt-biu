import React from "react";

 const Movie = ({data, ref}) => (<div className="movie">
         <img  src={"https://image.tmdb.org/t/p/w1280" + data.poster_path} alt={data.title}/>
            <div className="movie-info">
                <h3>{data.title}</h3>
            </div>
     </div>
 );
export default Movie;