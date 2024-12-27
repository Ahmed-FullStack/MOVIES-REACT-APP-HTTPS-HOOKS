import Card from '../../UI/Card/Card'
import MovieItems from '../MovieItems/MovieItems'
import './MoviesList.css'
export default function MoviesList(props) {
	const moviesList = props.movies.map(movie => {
		return (
			<MovieItems
				key={movie.key}
				id={movie.id}
				movieName={movie.movieName}
				releaseDate={movie.releaseDate}
				openingDialogue={movie.openingDialogue}
				reloadMovies={props.reloadMovies}
			/>
		)
	})

	return (
		<Card>
			<ul className={`movies-list ${props.showList ? ' show' : ``} `}>
				{props.err && !props.loading && (
					<div className='loader'>
						<div className='loader-spinner loader-spinner-red'></div>
						<div className='loader-spinner loader-spinner-yellow'></div>
						<div className='loader-spinner loader-spinner-skyblue'></div>
						<h2 className='err-text transparent-bg-selection cursor-default'>
							{props.err}
						</h2>
					</div>
				)}
				{!props.err && !props.loading && moviesList}
				{props.loading && !props.movie && !props.err && (
					<div className='loader'>
						<div className='loader-spinner loader-spinner-blue'></div>
						<div className='loader-spinner loader-spinner-green'></div>
						<div className='loader-spinner loader-spinner-aliceblue'></div>
						<h2 className='loader-text transparent-bg-selection cursor-default'>
							Accessing Database
						</h2>
					</div>
				)}
			</ul>
		</Card>
	)
}
