import { Card, CardImg, Container, Row, Col } from "react-bootstrap"


export const SimilarMovies = ({ movies, onMovieClick }) => {
  console.log(movies)

  return (
    <Container>
      <Row>
        <h2>Similar Movies</h2>
        {movies.map((movie) => (
          <Col key={movie.id} md={3} className="mb-4, mt-2">
            <Card 
            className="h-100" 
            onClick={() => onMovieClick(movie)}>
              <CardImg 
              variant="top" 
              className="img-fluid"
              src={movie.Image}  />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}