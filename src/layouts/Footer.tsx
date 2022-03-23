import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer className="ap__footer">
            <Container fluid>
                <Row>
                    <Col md={6}>
                    &copy; {year} - ANIKA UI Kit
                    </Col>
                    <Col md={6}>
                        <div className="ap__footer-links text-md-end d-none d-md-block">
                            <Link to="#">Support</Link>
                            <Link to="#">Privacy</Link>
                            <Link to="#">Services</Link>
                            <Link to="#">Help Center</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
