import { Container, Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export const MovieView = ({ movies }) => {
 
    const {title} = useParams();
    const decodedTitle = decodeURIComponent(title);
    const movie = movies.find((m)=>m.Title===decodedTitle);

    if (!movie) {
        return (
            <Container>
                <div>Movie not found</div>
            </Container>
        )
    };

    return (
        <Container>
            <Row className="mb-5 mt-5">
                <Col md={7} className="d-flex flex-column justify-content-between">
                <div>
                    <h1>{movie.Title}</h1>
                    <p className="d-flex justify-content-between">
                        <span>{movie.Director.Name}</span>
                        <span>{movie.Genre.Name}</span> 
                    </p>
                    <p>{movie.Description}</p>
                    <p>{movie.Actors.map(actor => actor.Name).join(', ')}</p>
                    <p>{movie.Release}</p>
                    <p>{movie.Rating}</p>
                    </div>
                    <Link to={'/movies'}>
                    <Button
                        className="btn align-self-start"
                    
                    >Back</Button>
                    </Link>
                </Col>
                <Col md={5}>
                    <div className="position-relative">
                        <img src={movie.Image} alt={movie.Title} style={{ maxHeight: '400px', width: '100%' }} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};
