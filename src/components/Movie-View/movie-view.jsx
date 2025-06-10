import { Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";


export const MovieView = ({ movies }) => {

  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const movie = movies.find((m) => m.Title === decodedTitle);


  if (!movie) {
    return (
      <Container>
        <div>Movie not found</div>
      </Container>
    )
  };

  const genreTooltip =
    <Tooltip id="genre-tooltip" >
      {movie.Genre?.Description || 'Unknown'}
    </Tooltip>

  return (
    <Container>
      <Row className="mb-5 mt-5 movie-view-card">
        <Col md={7} className="d-flex flex-column justify-content-between">
          <div>
            <h1>{movie.Title}</h1>
            <p className="d-flex justify-content-between">

              <OverlayTrigger
                placement="right"
                overlay={
                  <Tooltip>{movie.Director?.Bio}</Tooltip>
                }
              >
                <Link>
                  {movie.Director?.Name}
                </Link>
              </OverlayTrigger>


              <OverlayTrigger
                placement="left"
                overlay={genreTooltip}
              >
                <Link
                  variant="success"
                >
                  {movie.Genre?.Name}
                </Link>
              </OverlayTrigger>
            </p>
            <p>{movie.Release}</p>


            <p>"{movie.Description}"</p>

            <p className="d-flex flex-wrap gap-2">
              {movie.Actors.map((actor, index) => {
                return (
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip id={`actor-tooltip-${index}`}>
                        {actor.Bio || 'Unknown'}
                      </Tooltip>
                    }
                  >
                    <Link>{actor.Name}  </Link>
                  </OverlayTrigger>
                )
              })}
            </p>

            {/*   <p>{movie.Rating}</p> */}
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
