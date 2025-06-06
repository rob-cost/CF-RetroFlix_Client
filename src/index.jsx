import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import { MainView } from './components/Main-View/main-view'
import { Container } from 'react-bootstrap';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Container>
    <MainView />
    </Container>
  </StrictMode>,
)
