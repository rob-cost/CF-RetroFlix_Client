import { Container, Row, Col, Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

export const MovieView = ({ movies }) => {

  const { title } = useParams();
  const decodedTitle = decodeURIComponent(title);
  const movie = movies.find((m) => m.Title === decodedTitle);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (!movie) {
    return (
      <Container>
        <div>Movie not found</div>
      </Container>
    )
  };

  const genreTooltip = (
    <Tooltip id="genre-tooltip">
      Genre: {movie.Genre?.Name || 'Unknown'}
    </Tooltip>
  );





  return (
    <Container>
      <Row className="mb-5 mt-5 movie-view-card">
        <Col md={7} className="d-flex flex-column justify-content-between">
          <div>
            <h1>{movie.Title}</h1>
            <p className="d-flex justify-content-between">
              <Link 
              onClick={handleShow}
              >
                {movie.Director?.Name}
              </Link>
              

              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
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

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{movie.Director?.Name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>{movie.Director?.Bio}</Modal.Body>
            </Modal>

            <p>"{movie.Description}"</p>

            <p className="d-flex flex-wrap gap-2">
            {movie.Actors.map((actor, index) => {
              return(
              <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={
                <Tooltip id={`actor-tooltip-${index}`}>
                Actor: {actor.Bio || 'Unknown'}
                </Tooltip>
              }
              >
              <Link>{actor.Name}  </Link>
              </OverlayTrigger>

            )})}
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
