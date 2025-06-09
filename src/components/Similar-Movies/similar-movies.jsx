import { Card, CardImg, Container, Row, Col } from "react-bootstrap"
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../Movie-Card/movie-card";



export const SimilarMovies = ({ movies, token }) => {

  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);

    if (!movies || movies.length === 0) {
    return (
      <Container>Loading similar movies ...</Container>
    )
  }
  
  const movie = movies.find((m) => m.Title === decodedTitle);
  console.log(movie)
  const genre = movie.Genre.Name;
  const simMovies = movies.filter(m => m.Genre?.Name === genre && m.Title !== title)

  return (
    <Container>
      <Row>
        <h2>Similar Movies</h2>
        {simMovies.map((m) => {
          return (
            <Col className="mb-3" md={3} key={m.id}>
              <MovieCard
                movie={m}
                token={token}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  )
}