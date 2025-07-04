import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
import { MainView } from './components/Main-View/main-view'
import { Container } from 'react-bootstrap';
import { GoogleOAuthProvider } from '@react-oauth/google';

    const CLIENT_ID = "879652377778-1npt46o12rs03evj7r2pe2llkl34rs1d.apps.googleusercontent.com";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Container>
      <GoogleOAuthProvider clientId={CLIENT_ID} >
    <MainView />
    </GoogleOAuthProvider>
    </Container>
  </StrictMode>,
)
