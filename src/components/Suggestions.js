import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useParams, useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import _Backdrop from '../assets/backdrop.png';
import _Poster from '../assets/poster.png';
import './Suggestions.css';

const genreObj = [
    {
        id: '0',
        genre: 'Popular',
        url: 'https://api.themoviedb.org/3/discover/movie/?certification_country=US&certification=R&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '1',
        genre: 'Action',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=28&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '2',
        genre: 'Drama',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=18&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '3',
        genre: 'Crime',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=80&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '4',
        genre: 'Children',
        url: 'https://api.themoviedb.org/3/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '5',
        genre: 'Romance',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=10749&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '6',
        genre: 'Thriller',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=53&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
    {
        id: '7',
        genre: 'Comedy',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=35&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },

    {
        id: '8',
        genre: 'Music',
        url: 'https://api.themoviedb.org/3/discover/movie?with_genres=10402&sort_by=popularity.desc&api_key=9c9a236c211df46e640b24f29796b6c0&page=',
    },
];
export default function Suggestions({ movieGenre }) {
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';
    const [selectedGenreUrl, setSelectedGenreUrl] = useState('');
    const [title, setTitle] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [rate, setRate] = useState('');
    const [date, setDate] = useState('');
    const [overview, setOverview] = useState('');
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();
    const [count, setCount] = useState(1);
    const [show, setShow] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);
    const [genreName, setGenreName] = useState('');

    const { data, isPending, error } = useFetch(selectedGenreUrl);
    const [clickedValue, setClickedValue] = useState(false);
    const [clickedId, setClickedId] = useState('');

    useEffect(() => {
        genreObj.map((list) => {
            if (list.genre === movieGenre) {
                setSelectedGenreUrl(list.url + pageNumber);
                console.log(list.url, movieGenre);
                setGenreName(list.genre);
            }
        });
        if (data) {
            setTitle(data.results[count].title);
            setPosterPath(IMG_URL + data.results[count].poster_path);
            setBackdropPath(IMG_URL + data.results[count].backdrop_path);
            setRate(data.results[count].vote_average);
            setDate(data.results[count].release_date);
            setOverview(data.results[count].overview);
            // total_pages
            setTotalPages(data.total_pages - 1 > 500 ? 500 : data.total_pages - 1);
        }
        if (error) {
            setTimeout(() => {
                navigate('/itv-website/');
            }, 3000);
        }
    }, [movieGenre, data, error, pageNumber, navigate, count]);
    const handleOnClick = (info) => {
        navigate(`/itv-website/movie/${info}`);
    };

    return (
        <div className='suggestions'>
            <h1>More {movieGenre} movies</h1>
            <div className='suggestion-movies'>
                {data &&
                    data.results.slice(0, 10).map((movie) => (
                        <div className='movie' key={uuid()}>
                            {/* <OverlayMovie
                                title={movie.title}
                                date={movie.release_date}
                                overview={movie.overview}
                                clickedValue={clickedValue}
                                setClickedValue={setClickedValue}
                                info={clickedId === movie.title ? true : false}
                            /> */}
                            <img
                                src={
                                    movie.poster_path === null
                                        ? _Poster
                                        : IMG_URL + movie.poster_path
                                }
                                alt=''
                                srcSet=''
                                onClick={(e) => {
                                    if (!clickedValue) {
                                        setClickedValue(true);
                                        setClickedId(movie.title);
                                    } else {
                                        setClickedId('');
                                        setClickedValue(false);
                                    }
                                }}
                            />
                            {/* <img src='/images/poster.png' alt='' srcSet='' /> */}
                            {/* <div
                            className='overlay-init'
                            onClick={() => {
                                console.log(movie.poster_path);
                                handleOnClick(movie.id);
                            }}
                        >
                            <h3>{movie.title}</h3>
                            <h5>{movie.release_date}</h5>
                            <p>{movie.overview.substring(0, 300)}</p>
                            <h5>Click for more...</h5>
                        </div> */}
                            <div className='movie-info'>
                                <h5>{movie.title}</h5>
                                <div className='movie-info-sec'>
                                    <p>{movie.release_date}</p>
                                    <span>{movie.vote_average}</span>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}