import { Container, Row, Col } from "react-bootstrap";

export const MovieView = ({ movie, onBackClick }) => {
    console.log(movie, onBackClick)

    return (
        <Container>
            <Row className="mb-5">
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
                    <button
                        className="align-self-start"
                        onClick={onBackClick}
                        variant="primary"
                    >Back</button>
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
