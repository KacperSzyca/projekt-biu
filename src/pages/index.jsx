import React, {useState, useRef, useCallback} from 'react';
import FetchMovies from "./FetchMovies";
import Movie from "../components/Movie"
import InfiniteScroll from "react-infinite-scroll-component";




export default function MainPage() {

    const [query, setQuery] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [url, setUrl] = React.useState("movie/popular");

    const {
        movies
    } = FetchMovies(query, pageNumber, url)


    function handleSearch(e) {
        setQuery(e.target.value)
        setPageNumber(1)
        if(e.target.value.length > 0){
            setUrl("search/movie")
        }else{
            setUrl("movie/popular")
        }

        console.log()
    }

    return (
        <div className="outerMain">
            <input type="text" value={query} onChange={handleSearch}></input>
        <div className="innerMain">

            <InfiniteScroll next={() => setPageNumber(pageNumber + 1)} hasMore={true}  dataLength={movies.length} loader={<h4>Loading...</h4>}>
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

