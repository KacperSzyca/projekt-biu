import React, {useState, useRef, useCallback} from 'react';
import FetchMovies from "./FetchMovies";
import Movie from "../components/Movie"
import InfiniteScroll from "react-infinite-scroll-component";




export default function MainPage() {

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)

    const {
        movies
    } = FetchMovies( pageNumber)


    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
    }



    return (
        <div className="outerMain">
            <input type="text" value={query} onChange={handleSearch}></input>
        <div className="innerMain">

            <InfiniteScroll next={() => setPageNumber(pageNumber + 1)} hasMore={true}  dataLength={movies.length}>
                <div className="movie-container">
                {movies.length > 0 && movies.map((movie, index) =>
                   <Movie key={movie.id} data={movie}/>
                )}
                </div>
            </InfiniteScroll>
         </div>
         </div>
    );
}

