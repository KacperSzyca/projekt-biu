import React, {useState} from "react";
import ReactPlayer from "react-player";
import Actor from "./Actor";
import axios from 'axios'
import FetchDetails from "../fetchData/FetchDetails";
import FetchCredits from "../fetchData/FetchCredits";
import FetchVideo from "../fetchData/FetchVideo";
import FetchImages from "../fetchData/FetchImages";
import ImageGallery from "react-image-gallery";
import { Rating } from '@material-ui/lab';


export default function MovieInfo(props) {
    const [id] = useState(props.match.params.id);
    const {video} = FetchVideo(id)
    const [api_key] = React.useState("2d6ad82fcaf4bba35b7dac301e918cf2");

    const {
        movie,
        genres
    } = FetchDetails(id)

    const {
        cast,
        crew
    } = FetchCredits(id)

    const {
        images
    } = FetchImages(id)

    const options = {
        headers: 'application/json'
    };

    function handleRatingChange(value) {
        console.log((value.target.defaultValue)*2);

        axios({
            method: 'POST',
            url: 'https://api.themoviedb.org/3/movie/' + id + '/rating',
            params: {api_key: api_key},
            data: { value: `${(value.target.defaultValue)*2}`},
        }).then(res => {
            console.log("juhu")
        })
    }

    return (
        <div className="outerMain" style={{marginTop: 100}}>
            <div className="innerMain" style={{textAlign: 'center'}}>
                <div className="movieHeader">
                    <img src={"https://image.tmdb.org/t/p/original/" + movie.backdrop_path} alt={movie.title}/>
                    <div className='movieInfo'>
                        {movie.popularity > 200? <h5 style={{color: "gold"}}>Popular Film</h5>: ""}
                        <h1>{movie.title}</h1>
                        <div className='details'>
                            <p>Release date: {movie.release_date}</p>
                            <p>{showGenres(genres)} </p>
                        </div>
                        <p>Director: {getDirector(crew).join(', ')}</p>
                        <h4>{movie.overview}</h4>
                        <a href={"https://www.themoviedb.org/movie/ " + movie.id}>
                            <h7>See at the movie db</h7>
                        </a>
                        <h3>Rate this film</h3>
                        <Rating name="size-large"
                                defaultValue={2}
                                size="large"
                                onChange={handleRatingChange}
                                precision={0.5}/>
                    </div>
                </div>
                <h2> Main Actors</h2>
                {getMainActors(cast).length > 0 && getMainActors(cast).map((actor, index) =>
                    <Actor key={actor.id} data={actor}/>
                )}
                <div className="moviesVideos">
                    {images.length > 0 ?
                        <div className='gallery'>
                            <h2>Gallery</h2>
                            <ImageGallery items={images}/>
                        </div> : ""}
                    {video.length > 0 ?
                        (<div className='movieVideo'>
                            <h2>Trailer</h2>
                            <ReactPlayer url={video} width="100%"/>
                        </div>) : ""
                    }
                </div>
            </div>
        </div>
    );
};

function showGenres(genres) {
    if (genres.length === 1) {
        return "Genre: " + genres.map(genre => " " + genre.name);
    } else {
        return "Genres: " + genres.map(genre => " " + genre.name);
    }
}


function getDirector(crew) {
    var directors = [];
    crew.map(crew => {
        if (crew.job === "Director") {
            directors.push(crew.name);
        }
    })
    return directors;
}

function getMainActors(cast) {
    var actors = [];
    cast.slice(0, 6).map(cast => {
        if (cast.known_for_department === "Acting") {
            actors.push(cast);
        }
    })
    return actors;
}





