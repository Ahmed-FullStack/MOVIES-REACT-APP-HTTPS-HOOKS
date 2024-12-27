import { useRef } from 'react'
import Button from '../../UI/Button'
import Card from '../../UI/Card/Card'
import './AddMovie.css'

export default function AddMovie(props) {
	const movieTitleRef = useRef()
	const movieOpeningTextRef = useRef()
	const movieReleaseDateRef = useRef()

	const movieRequestHandler = e => {
		let movieTitleFilled = movieTitleRef.current.value
		let movieOpeningTextFilled = movieOpeningTextRef.current.value
		let movieReleaseDateFilled = movieReleaseDateRef.current.value
		const movieInputRequired =
			movieTitleFilled && movieOpeningTextFilled && movieReleaseDateFilled
		e.preventDefault()

		if (!movieTitleFilled) {
			movieTitleRef.current.focus()
		} else if (!movieReleaseDateFilled) {
			movieReleaseDateRef.current.focus()
		} else if (!movieOpeningTextFilled) {
			movieOpeningTextRef.current.focus()
		}

		if (movieInputRequired) {
			const movie = {
				movieTitle: movieTitleRef.current.value,
				movieOpeningTitle: movieOpeningTextRef.current.value,
				movieReleaseDate: movieReleaseDateRef.current.value,
			}
			movieTitleRef.current.value = ``
			movieOpeningTextRef.current.value = ``
			movieReleaseDateRef.current.value = ``
			props.onMovieSubmit(movie)
		}
	}
	return (
		<Card>
			<form className='movie-form'>
				<div className='center-form'>
					<div className='form-controls form-flex-controls'>
						<label className='movie-labels title' htmlFor='title'>
							Title
						</label>
						<input
							className='movie-inputs form-title'
							id='title'
							ref={movieTitleRef}
							required={true}
						/>
					</div>
					<div className='form-controls form-flex-controls'>
						<label className='movie-labels release-date' htmlFor='release-date'>
							Release Date
						</label>
						<input
							type={`date`}
							className='movie-inputs form-release-date'
							id='release-date'
							ref={movieReleaseDateRef}
							required={true}
						/>
					</div>
					<div className='form-controls'>
						<label className='movie-labels opening-text' htmlFor='opening-text'>
							Opening Text
						</label>
						<textarea
							rows='10'
							cols='50'
							className='movie-inputs form-opening-text'
							id='opening-text'
							ref={movieOpeningTextRef}
							required={true}
						/>
					</div>
					<Button
						className={`no-margin`}
						type='submit'
						onClick={movieRequestHandler}
					>
						Submit
					</Button>
				</div>
			</form>
		</Card>
	)
}
