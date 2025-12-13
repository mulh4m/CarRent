import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCar } from "../features/CarSlice";
import { Button, Card, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, Row } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import pass from '../assets/pass.png'
import door from '../assets/door.png'
import transmission from '../assets/transmission.png'
import { IoChevronBackSharp } from "react-icons/io5";

const CarList = () => {
  const dispatch = useDispatch();
  const car= useSelector((state) => state.cars.cars);
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCar());
  }, [car]);

  useEffect(() => {
    if (!email)
      navigate("/");
  }, [email]);

  const [dropdownOpenPass, setDropdownOpenPass] = useState(false);
  const [selectedPass, setSelectedPass] = useState('');

  const togglePass = () => setDropdownOpenPass(prev => !prev);

  const passRanges = ['4', '6', '7', '8'];

  const handlePayment = () =>{
    if(!email){
      navigate("/");
    }else{
      navigate("/payment");
    }
  }

  const handleBack = ()=>{
    navigate("/home")
  }

  return (
    <div>
      <Container className='floor'>
        <Form className='row-card-search background'>
          <Col md="3" style={{padding:"10px"}}>
            <Card className="card">
              <Row>
                <Button 
                  style={{backgroundColor:"transparent", color:"black", border:"none"}}
                  onClick={handleBack}>
                  <IoChevronBackSharp/>
                </Button>
                <Col><h4>Filter</h4></Col>
                <Col><Link>Reset All</Link></Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <Row >
                    <h6>Transmission</h6>
                  </Row>
                  <Row >
                    <Col md="1"><input type="radio"/></Col>
                    <Col>Automatic</Col>
                  </Row>
                  <Row>
                    <Col md="1"><input type="radio"/></Col>
                    <Col>Manual</Col>
                  </Row>
                </Col>
              </Row>
              <hr/>
              <Row>
                  <Row>
                    <h6>Car Passengers</h6>
                  </Row>
                  <Row>
                    <Dropdown isOpen={dropdownOpenPass} toggle={togglePass}>
                        <DropdownToggle caret style={{ width: '40%', backgroundColor: 'white', color: 'black', textAlign: 'left' }}>
                            {selectedPass || "Select"}
                              </DropdownToggle>
                                <DropdownMenu>
                                    {passRanges.map((pass, index) => (
                                      <DropdownItem key={index} onClick={() => setSelectedPass(pass)} active={selectedPass === pass}>
                                        {pass}
                                      </DropdownItem>
                                ))}
                        </DropdownMenu>
                      </Dropdown>
                  </Row>
                  <hr/>
                  <Row>
                    <Row>
                    <h6>Price Range</h6>
                  </Row>
                  <Row style={{paddingBottom:"10px"}}>
                    <Col md="4">
                      From
                    </Col>
                    <Col md="6">
                      <input className="form-control"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      To
                    </Col>
                    <Col>
                     <input className="form-control"/>
                    </Col>
                  </Row>
                  </Row>
              </Row>
            </Card>
          </Col>
          <Col>
          <div className="search-cars">
          {
            car.length === 0 ?(
              <Row>
                  <Col style={{ textAlign: 'center', padding: "10px", color:"white", justifyContent:"center"}}>
                    No cars available
                  </Col>
              </Row>
            ):
            (car.map((car) => {
            return (
              <div >
                <Card>
                  <Row>
                    <Col md="4">
                      <img src={car.carImg} style={{width:"150px"}}/>
                    </Col>
                    <Col>
                      <Row><b>{car.carName}</b></Row>
                      <Row>
                        <Col md="3">
                          <img src={pass} style={{width: "15px"}} /> {car.carPass}
                        </Col>
                        <Col md="3">
                          <img src={door} style={{width: "15px"}} /> {car.carDoor}
                        </Col>
                        <Col md="3">
                          <img src={transmission} style={{width: "15px"}} /> {car.transmission}
                        </Col>
                      </Row>
                    </Col>
                    <Col style={{alignContent:"center"}}>
                      <b>{car.carPrice}</b> {"OMR/day"}
                    </Col>
                    <Col style={{alignContent:"center"}}>
                      <Button onClick={handlePayment}>Select</Button>
                    </Col>
                  </Row>
                </Card>
                <br/>
              </div>
              
            )}))
          }
          </div>
          </Col>
        </Form>
      </Container>
    </div>
  )
}

export default CarList;
