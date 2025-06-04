import { Card, CardImg, Container, Row, Col } from "react-bootstrap"


export const SimilarMovies = ({ movies, onMovieClick }) => {
    console.log(movies)

    return (
    <Row>
        <h2>Similar Movies</h2>
      {movies.map((movie) => (
        <Col key={movie.id} md={3} className="mb-4, mt-2">
          <Card onClick={()=> onMovieClick(movie)}>
            <CardImg variant="top" src={movie.Image} />
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Description}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  )
}