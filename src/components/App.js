import React, { useState, useEffect } from 'react';
import MovieInfo from './MovieInfo';

export default function App(props) {
	const [query, updateQuery] = useState({
		baseURL: 'http://www.omdbapi.com/?',
		apiKey: 'apikey=' + '97242460',
		option: '&s=',
		title: '',
		searchURL: ''
	});

	const [movies, setMovies] = useState({});

	useEffect(() => {
		(async () => {
			if (query.searchURL) {
				try {
					const response = await fetch(query.searchURL);
					const data = await response.json();
					await setMovies(data);
				} catch (error) {
					console.error(error);
				} finally {
					updateQuery({
						baseURL: 'http://www.omdbapi.com/?',
						apiKey: 'apikey=' + '97242460',
						option: '&s=',
						title: '',
						searchURL: ''
					});
				}
			}
		})();
	}, [query]);

	const handleChange = event => {
		updateQuery({
			...query,
			...{
				[event.target.id]: event.target.value
			}
		});
	};

	const handleSubmit = event => {
		event.preventDefault();
		updateQuery({
			...query,
			searchURL: query.baseURL + query.apiKey + query.option + query.title
		});
	};

	return (
		<div className="Page-wrapper">
			<form onSubmit={handleSubmit}>
				<label htmlFor="title"> Title</label>
				<input
					id="title"
					type="text"
					value={query.title}
					onChange={handleChange}
				/>
				<input type="submit" value="Find Movie List" />
			</form>
			<div className={'Page'}>
				{Object.keys(movies).length ? <MovieInfo movies={movies} /> : ''}
			</div>
		</div>
	);
}
