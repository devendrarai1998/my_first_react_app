import React,{useEffect, useState} from "react";
import MovieCard from "./MovieCard";
import "./App.css";
import SearchIcon from "./search.svg"
//ddb77a13

const API_URL = "http://www.omdbapi.com?apikey=ddb77a13";

/* const movie = {
    key:"movie.key",
    Year:"movie.Year",
    Poster:"movie.Poster",
    Title:"movie.Title",
    Type:"movie.Type"
} */

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data =  await response.json();

        setMovies(data.Search);
    }
    useEffect(() => {
        searchMovies();
    }, []);

    return (
        <div className="app">
        <h1>MovieApp</h1>

        <div className="search">
            <input
             placeholder="Search Movies"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
            />
            <img
            src={SearchIcon}
            alt="Search"
            onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {
            movies?.length > 0
            ? (
                <div className="container">
                {movies.map((movie) => (
                    <MovieCard movie={movie}/>
                ))}
            </div>
    
            ) : (
                <div className="empty">
                    <h2>No Movies Found</h2>
                </div>
            )
        }
    </div>
    );
}

export default App;