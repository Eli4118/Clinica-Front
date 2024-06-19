import { Container, Row, Col, Image } from 'react-bootstrap';
import image1 from "../assets/img/image1.png"
import image2 from "../assets/img/image2.png"
import image3 from "../assets/img/image3.png"
import image4 from "../assets/img/image4.png"
import image5 from "../assets/img/image5.png"
import image6 from "../assets/img/image6.png"
import image7 from "../assets/img/image7.png"
import image8 from "../assets/img/image8.png"
import docImage from "../assets/img/doc_2_mejor-removebg-preview.png"
const ClinicaSePrice = () => {
  return (
    <Container  fluid className="pagina">
      <div className="contenido">
        <section className="sobre-nosotros">
          <Row>
            <Col md={6}>
              <Image src={docImage} alt="Doctor" className="doc-image" fluid />
            </Col>
            <Col md={6}>
              <div className="texto-nosotros">
                <h2 className="titulo-nosotros">Sobre Nosotros</h2>
                <br />
                <p>
                  Desde su fundación el 25 de abril de 1940, la Clínica SePrise ha sido un referente en la medicina argentina.
                  Nuestra clínica combina tradición e innovación, ofreciendo servicios médicos de alta calidad con tecnología
                  avanzada
                  y un equipo de profesionales de primer nivel. Con un enfoque en la excelencia y la ética, seguimos
                  modernizando nuestras
                  instalaciones para brindar la mejor atención a nuestros pacientes.
                </p>
                <br />
                <ul className="lista-nosotros ">
                  <li>Excelente servicio</li>
                  <li>Médicos Capacitados</li>
                  <li>Guardia 24 hrs.</li>
                  <li>Atención de alta calidad</li>
                </ul>
              </div>
            </Col>
          </Row>
        </section>

        <section id='servicios' className="servicios">
          <h2 className="titulo-servicios">Nuestros Servicios</h2>
          <div className="galeria-de-iconos">
            <Row className='justify-content-around'> 
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image1} alt="Servicio 1" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image2} alt="Servicio 2" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image3} alt="Servicio 3" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image4} alt="Servicio 4" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image5} alt="Servicio 5" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image6} alt="Servicio 6" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image7} alt="Servicio 7" className="icono-servicio" fluid /></Col>
              <Col xs={7} sm={6} md={4} lg={3} className="mb-4 justify-content-around" ><Image src={image8} alt="Servicio 8" className="icono-servicio" fluid /></Col>
            </Row>
          </div>
        </section>
      </div>
      
      
    </Container>
  );
  
};

export default ClinicaSePrice;
