import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useFetch } from '../hooks/useFetch';
import OverlayMovie from './OverlayMovie';
export default function MovieCards({ url, Gen }) {
    const { data, isPending, error } = useFetch('https://' + url);
    // console.log(url);
    const IMG_URL = 'https://image.tmdb.org/t/p/w1280';

    const [title, setTitle] = useState('');
    const [posterPath, setPosterPath] = useState('');
    const [backdropPath, setBackdropPath] = useState('');
    const [rate, setRate] = useState('');
    const [date, setDate] = useState('');
    const [overview, setOverview] = useState('');
    const [count, setCount] = useState(1);
    const [clickedValue, setClickedValue] = useState(false);
    const [clickedId, setClickedId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (data) {
            setTitle(data.results[count].title);
            setPosterPath(IMG_URL + data.results[count].poster_path);
            setBackdropPath(IMG_URL + data.results[count].backdrop_path);
            setRate(data.results[count].vote_average);
            setDate(data.results[count].release_date);
            setOverview(data.results[count].overview);
        }
    }, [data, count, isPending, error]);

    const handleOnClick = (info) => {
        navigate(`/movie/${info}`);
    };
    return (
        <>
            {error && <h1>{error}</h1>}
            {isPending && <h1>Loading...</h1>}
            {data &&
                data.results.slice(0, 16).map((movie) => (
                    <div className='poster' key={movie.title}>
                        {/* <OverlayMovie
                            title={movie.title}
                            date={movie.release_date}
                            overview={movie.overview.substring(0, 300)}
                            clickedValue={clickedValue}
                            setClickedValue={setClickedValue}
                            info={clickedId === movie.title ? true : false}
                        /> */}
                        <img
                            src={IMG_URL + movie.poster_path}
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
                        <div
                            className='overlay-init'
                            onClick={() => handleOnClick(movie.id)}
                        >
                            <h3>{movie.title}</h3>
                            <h5>{movie.release_date}</h5>
                            <p>{movie.overview.substring(0, 200)}</p>
                            <p>Click for more...</p>
                        </div>
                        {/* <h3>{movie.title}</h3>
                        <h3>{movie.vote_average}</h3> */}
                    </div>
                ))}
        </>
    );
}
