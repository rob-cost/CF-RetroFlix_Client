export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie, onBackClick)

    return (
        <div>
            <div>
                <img src={movie.Image} alt={movie.Title} />
            </div>
            <div>
                <span>Title: {movie.Title} </span>
            </div>
            <div>
                <span>Genre: {movie.Genre.Name}</span>
            </div>
            <div>
                <span>Description: {movie.Description}</span>
            </div>
            <div>
                <span>Director: {movie.Director.Name} </span>
            </div>
            <div>
                <span>Actors: {movie.Actors.map(actor =>actor.Name).join(', ')}</span>
            </div>
            <div>
                <span>Release: {movie.Release}</span>
            </div>
            <div>
                <span>Rating: {movie.Rating}</span>
            </div>
            <div>
                <button onClick={onBackClick}>Back</button>
            </div>
        </div>
    );
};
