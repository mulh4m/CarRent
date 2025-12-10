import { Col, Container, Row } from "reactstrap";
import facebook from "../assets/facebook.png"
import insta from "../assets/insta.png"
import twitter from "../assets/twitter.png"

const Footer=()=>{
    return(
        <div className="footer">
            <Container>
                <Row>
                    <Col className="col" md="6">
                        <Row className="header">
                            Rent Car
                        </Row>
                        <Row className="text">
                            © 2025 Rent Car. All rights reserved. We provide reliable and affordable car rental services to make your journey smooth and stress-free. Whether you need a compact car for city driving or an SUV for family trips, we’ve got you covered. Drive with confidence — your comfort and safety are our top priority.
                        </Row>
                        
                    </Col>

                    <Col>
                        <Row className="header">
                            Contact Us
                        </Row >
                        <Row className="text">
                            someone@gmail.com
                        </Row>
                        <Row className="text-contact">
                            Tel: +9XXX XXXX
                        </Row>
                        <Row className="text-contact">
                            Address: somewhere
                        </Row>
                       
                    </Col>

                    <Col>
                        <Row className="header">
                            Follow Us
                        </Row>
                        <Row className="text">
                            <Col md="2" >
                                <img className="social" src={facebook} />
                            </Col>
                            <Col md="2">
                                <img className="social" src={insta}/>
                            </Col>
                            <Col md="2">
                                <img className="social" src={twitter}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Footer;