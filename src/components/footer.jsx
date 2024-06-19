import { Container, Row, Col, Image } from 'react-bootstrap';
import logoClinica from '../assets/img/logoclinica.png';
import mailIcon from '../assets/img/mail.svg';
import phoneIcon from '../assets/img/phone.svg';
import locationIcon from '../assets/img/location.svg';
import fbIcon from '../assets/img/fb.svg';
import twitterIcon from '../assets/img/twitter.svg';
import instagramIcon from '../assets/img/instagram.svg';

const FooterComponent = () => {
  return (
    <footer  className="footer">
      <Container>
        <Row>
          <Col md={4} className="logo">
            <div className="overlap">
              <div className="overlap-group">
                <Image className="logoclinica" src={logoClinica} alt="Logo Clinica" fluid />
                <div className="text-wrapper">Clínica</div>
              </div>
              <div className="div">SePrice</div>
            </div>
          </Col>
          <Col md={8}>
            <Row>
              <Col md={12}>
                <p className="copyright">
                  2024 Clinica Seprice & Discordia team. Todos los derechos reservados.
                </p>
              </Col>
            </Row>
            <Row>
              <Col md={4} className="contact-info">
                <div className="direccion-de-correo">Seprice@clínica.com.ar</div>
                <Image className="icon-outlined-other" src={mailIcon} alt="Email Icon" fluid />
                <div className="correo">Correo:</div>
              </Col>
              <Col md={4} className="contact-info">
                <div className="n-telefono">011-59982454</div>
                <Image className="UI-icon-phone-call" src={phoneIcon} alt="Phone Icon" fluid />
                <div className="text-wrapper-2">Turnos:</div>
              </Col>
              <Col md={4} className="contact-info">
                <div className="domicilio">Av.Lezama- CABA</div>
                <Image className="UI-icon-location" src={locationIcon} alt="Location Icon" fluid />
                <div className="ubicaci-n">Ubicación:</div>
              </Col>
            </Row>
            <Row>
              <Col md={12} className="text-center">
                <div className="text-wrapper-3">Datos de contacto</div>
                <Image className="logo-fb-simple" src={fbIcon} alt="Facebook Logo" fluid />
                <Image className="logo-twitter" src={twitterIcon} alt="Twitter Logo" fluid />
                <Image className="logo-instagram" src={instagramIcon} alt="Instagram Logo" fluid />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterComponent;