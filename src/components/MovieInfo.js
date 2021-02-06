import React from 'react';

export default function MovieInfo(props) {
	return (
		<div className={'column'}>
			{props.movies.Search.map(movie => {
				return (
					<div>
						<h1>Title: {movie.Title}</h1>
					</div>
				);
			})}
		</div>
	);
}
