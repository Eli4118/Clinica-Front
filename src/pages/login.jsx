import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import imglogin from '../assets/img/imglogin.png';
import { useForm } from 'react-hook-form';
import { useAuth } from '../context/authContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { authLogin, user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();
    
    const onSubmit = handleSubmit(async (values) => {
        await authLogin(values);
        window.location.reload();
    });

    useEffect(() => {
        if (isAuthenticated && !loading) {
            navigate("/");
            //poner mensaje bienvenida
        }
    }, [isAuthenticated, loading, navigate]);

    return (
        <Container fluid className="vh-100 d-flex align-items-center justify-content-center">
            <Row className="w-100">
                <Col md={6} className="d-none mb-5 d-md-flex align-items-center justify-content-center">
                    <img src={imglogin} className="img-fluid mb-5 ms-5" alt="Imagen de bienvenida" />
                </Col>
                <Col md={6} className="d-flex mb-5 align-items-center justify-content-center">
                    <Card className="p-4 mt-n5 me-5 mb-5" style={{ width: '100%', maxWidth: '450px' }}>
                        <Card.Body>
                            <Card.Title className="text-center text-wrapper-3">Bienvenido</Card.Title>
                            <Form onSubmit={onSubmit}>
                                <Form.Group>
                                    <Form.Label htmlFor="usuario">Usuario:</Form.Label>
                                    <Form.Control type="text" id="usuario" placeholder="Ingrese su usuario"
                                        {...register('usuario', { required: 'El usuario es obligatorio' })} />
                                    {errors.usuario && <p className='text-danger'>El usuario es requerido</p>}
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label htmlFor="contraseña">Contraseña:</Form.Label>
                                    <Form.Control type="password" id="contraseña" placeholder="Ingrese su contraseña"
                                        {...register('contraseña', { required: 'La contraseña es obligatoria' })} />
                                    {errors.contraseña && <p className='text-danger'>La contraseña es requerida</p>}
                                </Form.Group>
                                <div className="form-group justify-content-center d-flex">
                                    <Button type="submit" className="btn btn-primary">
                                        {loading ? "Cargando..." : "Aceptar"}
                                    </Button>
                                </div>
                                <div className="justify-content-center d-flex">
                                    <Link to="/forgot-password">Olvidé mi contraseña</Link>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginComponent;
