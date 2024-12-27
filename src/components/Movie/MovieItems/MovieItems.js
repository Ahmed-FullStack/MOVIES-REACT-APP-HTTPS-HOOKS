import Button from '../../UI/Button'
import './MovieItems.css'
export default function MovieItems(props) {
	async function deleteItemHandler() {
		props.reloadMovies()
		const response = await fetch('http://localhost:3000/', {
			method: 'DELETE',
			body: JSON.stringify({ id: props.id }),
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	return (
		<li className='movies-item txt-center'>
			<h2 className='movie-title'>{props.movieName}</h2>
			<h2 className='movie-release-date'>
				{`${props.releaseDate && 'Release Date :'}`} {props.releaseDate}
			</h2>
			<p className='movie-dialogue'>{props.openingDialogue}</p>

			<Button onClick={deleteItemHandler}>Delete</Button>
		</li>
	)
}
