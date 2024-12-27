import { type } from '@testing-library/user-event/dist/type';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import AddMovie from './components/Movie/AddMovie/AddMovie';
import MoviesList from './components/Movie/MoviesList/MoviesList';
import Button from './components/UI/Button';

export default function App() {
	const [movies, setMovies] = useState([]);
	const [showMovies, setShowMovies] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [err, setErr] = useState(false);
	const FireBaseURL =
		'https://react-app-ac926-default-rtdb.firebaseio.com/movies.json';

	const SwapAPI = 'https://swapi.dev/api/films';
	const showMovieshandler = useCallback(async () => {
		setShowMovies(prevsMoviesState => !prevsMoviesState);
		setIsLoading(true);
		setErr(null);
		try {
			const response = await fetch(FireBaseURL);
			if (!response.ok) {
				throw new Error('Something Went Wrong');
			}

			const data = await response.json();

			let loadedMovie = [];

			for (const key in data) {
				loadedMovie.push({
					key: key,
					episodeId: data[key],
					movieName: data[key].movieTitle,
					openingDialogue: data[key].movieOpeningTitle,
					releaseDate: data[key].movieReleaseDate,
				});
			}

			// const loadedMovie = data.map(dataItems => {
			// 	return {
			// 		key: dataItems._id,
			// 		id: dataItems._id,
			// 		movieName: dataItems.movieTitle,
			// 		openingDialogue: dataItems.movieOpeningTitle,
			// 		releaseDate: dataItems.movieReleaseDate,
			// 	};
			// });

			setMovies(loadedMovie);
		} catch (err) {
			if (err.message === 'Failed to fetch') {
				setErr('Connect to the Internet');
			} else {
				setErr(err.message);
			}
		}
		setIsLoading(false);
	}, []);
	// useEffect(() => {
	// 	showMovieshandler()
	// }, [showMovieshandler])

	const movieSubmitHandler = async movie => {
		try {
			const response = await fetch(FireBaseURL, {
				method: 'POST',
				body: JSON.stringify(movie),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const data = await response.json();
			console.log(data);
		} catch (err) {}
	};

	return (
		<div className='App'>
			<AddMovie onMovieSubmit={movieSubmitHandler} />
			<Button className='movies-btn' onClick={showMovieshandler}>
				Show Movies
			</Button>
			<section className='hero-section'>
				<MoviesList
					movies={movies}
					showList={showMovies}
					err={err}
					loading={isLoading}
					reloadMovies={showMovieshandler}
				/>
			</section>
		</div>
	);
}
