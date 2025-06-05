import { Card, CardImg, Container, Row, Col } from "react-bootstrap"
import { useParams, Link } from "react-router-dom";



export const SimilarMovies = ({ movies }) => {
  console.log(movies)
  const {title} = useParams();
  const decodedTitle = decodeURIComponent(title);
  const movie = movies.find((m)=>m.Title===decodedTitle);
  const genre = movie.Genre.Name;
  const simMovies = movies.filter(m => m.Genre.Name === genre && m.Title !== title)

  return (
    <Container>
      <Row>
        <h2>Similar Movies</h2>
        {simMovies.map((movie) => (
          <Col key={movie.id} md={3} className="mb-4, mt-2">
           <Link to ={`/movies/${encodeURIComponent(movie.Title)}`}>
            <Card 
            className="h-100" 
            >
              <CardImg 
              variant="top" 
              className="img-fluid"
              src={movie.Image}  />
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
              </Card.Body>
            </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  )
}