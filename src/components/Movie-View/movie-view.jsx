import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { UseMovieAction } from "../Use-Movie-Action/useMovieAction";

export const MovieView = ({ movies, token, favoriteChange }) => {
  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const movie = movies.find((m) => m.Title === decodedTitle);

  const {
    isFavorite,
    toWatch,
    addToFavorites,
    removeFromFavorites,
    addToWatch,
    removeFromToWatch,
  } = UseMovieAction({ movie, token, favoriteChange });

  if (!movie) {
    return (
      <Container>
        <div>Movie not found</div>
      </Container>
    );
  }

  const genreTooltip = (
    <Tooltip id="genre-tooltip">
      {movie.Genre?.Description || "Unknown"}
    </Tooltip>
  );

  return (
    <Container>
      <Row className="mb-5 mt-5 movie-view-card">
        <Col md={7} className="d-flex flex-column justify-content-between">
          <div>
            <h1>{movie.Title}</h1>
            <p className="d-flex justify-content-between">
              <OverlayTrigger
                placement="right"
                overlay={<Tooltip>{movie.Director?.Bio}</Tooltip>}
              >
                <Link>{movie.Director?.Name}</Link>
              </OverlayTrigger>

              <OverlayTrigger placement="left" overlay={genreTooltip}>
                <Link variant="success">{movie.Genre?.Name}</Link>
              </OverlayTrigger>
            </p>
            <p>{movie.Release}</p>

            <p>"{movie.Description}"</p>

            <p className="d-flex flex-wrap gap-2">
              {movie.Actors.map((actor, index) => {
                return (
                  <OverlayTrigger
                    key={movie.Actors.Name}
                    placement="bottom"
                    overlay={
                      <Tooltip id={`actor-tooltip-${index}`}>
                        {actor.Bio || "Unknown"}
                      </Tooltip>
                    }
                  >
                    <Link>{actor.Name} </Link>
                  </OverlayTrigger>
                );
              })}
            </p>

            {/*   <p>{movie.Rating}</p> */}
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={"/movies"}>
              <Button className="btn align-self-start">Back</Button>
            </Link>
            <div className="d-flex gap-2">
              {!toWatch ? (
                <Button onClick={addToWatch} className="btn">
                  + To Watch
                </Button>
              ) : (
                <Button onClick={removeFromToWatch} className="btn">
                  - Remove
                </Button>
              )}
              {!isFavorite ? (
                <Button
                  onClick={addToFavorites}
                  className="bi bi-heart btn"
                ></Button>
              ) : (
                <Button
                  onClick={removeFromFavorites}
                  className="bi bi-heart-fill btn"
                ></Button>
              )}
            </div>
          </div>
        </Col>
        <Col md={5}>
          <div className="position-relative">
            <img
              src={movie.Image}
              alt={movie.Title}
              style={{ maxHeight: "400px", width: "100%" }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};
