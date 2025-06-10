import Lottie from 'lottie-react';
import animationData from '/src/assets/animation/404-animation.json';
import { Container, Row, Col } from 'react-bootstrap';


export const NotFound404 = () => {
  return (
    <>
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
        <Lottie 
        animationData={animationData} 
        style={{ height: 400, width: 400 }}
        loop={true}
        className='d-flex justify-content-center'
      />
      <h1>Oops! Page Not Found</h1>
      <p>The page you're looking for seems to have wandered off...</p>
        </Col>
      </Row>
      
    </Container>
    </>
  )
}