import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Col, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Form, FormGroup, Modal, ModalBody, Row, Table } from "reactstrap";
import { getCar, saveCar, deleteCar,updateCar } from "../features/CarSlice";
import delLogo from '../assets/delete.png'
import uptLogo from '../assets/update.png'
import pass from '../assets/pass.png'
import door from '../assets/door.png'
import transmission from '../assets/transmission.png'
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CarAdminValidation } from "../validations/CarAdminValidation";

const Admin = () => {

    const [modal, setModal] = useState(false);

    // Add / Update Fields
    const [cName, setCname] = useState('');
    const [cImg, setCimg] = useState('');
    const [cPrice, setCprice] = useState('');
    const [selectedPass, setSelectedPass] = useState('');
    const [selectedDoor, setSelectedDoor] = useState('');
    const [TSelected, setSelectedT] = useState('');

    // Dropdown state
    const [dropdownOpenPass, setDropdownOpenPass] = useState(false);
    const [dropdownOpenDoor, setDropdownOpenDoor] = useState(false);

    // Update mode state
    const [isUpdate, setIsUpdate] = useState(false);
    const [updateId, setUpdateId] = useState(null);

    const dispatch = useDispatch();
    const cars = useSelector((state) => state.cars.cars || []);

    const passRanges = ['4', '6', '7', '8'];
    const doorRanges = ['2', '3', '4'];

    const toggle = () => {
        if (!modal) {
            // Reset when opening as "Add"
            resetFields();
            setIsUpdate(false);
            setUpdateId(null);
        }
        setModal(!modal);
    };

    const togglePass = () => setDropdownOpenPass(prev => !prev);
    const toggleDoor = () => setDropdownOpenDoor(prev => !prev);

    // Reset all fields
    const resetFields = () => {
        setCname('');
        setCimg('');
        setCprice('');
        setSelectedPass('');
        setSelectedDoor('');
        setSelectedT('');
    };

    // Submit for Add & Update
    const handleSubmitCar = () => {
        const data = {
            carName: cName,
            carPrice: cPrice,
            carImg: cImg,
            carDoor: selectedDoor,
            carPass: selectedPass,
            transmission: TSelected,
        };

        if (isUpdate) {
            dispatch(updateCar({ ...data, _id: updateId }));
        } else {
            dispatch(saveCar(data));
        }
        
        toggle();
    };

    // Load Update Data
    const handleUpdate = (car) => {
        setIsUpdate(true);
        setUpdateId(car._id);

        setCname(car.carName);
        setCprice(car.carPrice);
        setCimg(car.carImg);
        setSelectedDoor(car.carDoor);
        setSelectedPass(car.carPass);
        setSelectedT(car.transmission);

        setModal(true);
         //dispatch(updateCar(data));
        dispatch(getCar());
    };

    const handleDelete = (carId) => {
        dispatch(deleteCar(carId));
    };

    const {
        register,
        handleSubmit : CarAU,
        setValue,
        trigger,
        formState:{errors}
    } = useForm({resolver : yupResolver(CarAdminValidation)})

    const handlePassSelect = (pass) => {
        setSelectedPass(pass);
        setValue('carPass',pass)
        trigger('carPass')
    };

    const handleDoorSelect = (door) => {
        setSelectedDoor(door);
        setValue('carDoor',door)
        trigger('carDoor')
    };

    const handleTransmissionSelect = (type) => {
        setSelectedT(type);
        setValue('transmission', type);
        trigger('transmission');
    };

    useEffect(() => {
        dispatch(getCar());
    }, [cars]);

    return (
        <div>
            <Container>
                <Row className="admin-dashboard">
                    <h2>Dashboard</h2>
                </Row>

                <Form className="container admin-card">
                    <FormGroup>
                        <Button onClick={toggle} style={{ backgroundColor: " #AAC4FF", color: 'black', border: "none" }}>
                            Add Car
                        </Button>
                    </FormGroup>

                    <FormGroup>
                        <Table className="table table-bordered">
                            {cars.length > 0 && (
                                <Row style={{ padding: "10px" }}>
                                    <Col>Car Details</Col>
                                    <Col>Car Image</Col>
                                    <Col>Price / Day</Col>
                                    <Col></Col>
                                </Row>
                            )}

                            {cars.length === 0 ? (
                                <Row>
                                    <hr />
                                    <Col style={{ textAlign: 'center', padding: "10px" }}>
                                        No cars available
                                    </Col>
                                </Row>
                            ) : (
                                cars.map((car) => (
                                    <Row style={{paddingTop: "10px"}} key={car._id}>
                                        <hr />
                                        <Col style={{alignContent: 'center'}}>
                                            <Row style={{justifyContent: 'center', backgroundColor:"transparent"}}>
                                                {car.carName}
                                            </Row>
                                            <Row style={{justifyContent: 'center', backgroundColor:"transparent"}}>
                                                <Col md="3">
                                                    <img src={pass} style={{width: "25px"}} /> {car.carPass}
                                                </Col>
                                                <Col md="3">
                                                    <img src={door} style={{width: "25px"}} /> {car.carDoor}
                                                </Col>
                                                <Col md="3">
                                                    <img src={transmission} style={{width: "25px"}} /> {car.transmission}
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col style={{alignContent: 'center'}}>
                                            <img src={car.carImg} style={{width: "250px", backgroundColor:"transparent"}} />
                                        </Col>

                                        <Col style={{alignContent: 'center'}}>
                                            {car.carPrice} OMR
                                        </Col>

                                        <Col style={{paddingBottom: "10px", alignContent: 'center'}}>
                                            <Button
                                                style={{backgroundColor: "transparent", border: "none"}}
                                                onClick={() => handleUpdate(car)}
                                            >
                                                <img src={uptLogo} style={{ width: "25px" }} />
                                            </Button>

                                            {" "}

                                            <Button
                                                style={{ backgroundColor: "red", border: "none" }}
                                                onClick={() => handleDelete(car._id)}
                                            >
                                                <img src={delLogo} style={{ width: "25px" }} />
                                            </Button>
                                        </Col>
                                    </Row>
                                ))
                            )}
                        </Table>
                    </FormGroup>
                </Form>
                <br/>
                <Modal isOpen={modal} toggle={toggle} style={{ width: "500px", height: "500px" }}>
                    <ModalBody style={{ backgroundColor: "rgb(221,221,221)", borderRadius: "10px" }}>
                        <Row style={{ textAlign: "center", padding: "20px" }}>
                            <h3>{isUpdate ? "Update Car" : "Add Car"}</h3>
                        </Row>

                        <Row>
                            <Col>

                                <Row style={{ padding: "10px" }}>
                                    <Col md="5">Car Name</Col>
                                    <Col>
                                        <input 
                                        {...register('carName',{
                                            value:cName,
                                            onChange : (e) => setCname(e.target.value)
                                        })}
                                        className="form-control" 
                                        value={cName} />
                                        {errors.carName?.message}
                                    </Col>
                                </Row>

                                <Row style={{ padding: "10px" }}>
                                    <Col md="5">Car Price</Col>
                                    <Col>
                                        <input 
                                        {...register('carPrice',{
                                            value:cPrice,
                                            onChange : (e) => setCprice(e.target.value)
                                        })}
                                        type="number" 
                                        className="form-control" 
                                        value={cPrice}/>
                                        {errors.carPrice?.message}
                                    </Col>
                                </Row>

                                <Row style={{ padding: "10px" }}>
                                    <Col md="5">Car Image</Col>
                                    <Col>
                                        <input 
                                        {...register('carImg',{
                                            value:cImg,
                                            onChange : (e) => setCimg(e.target.value)
                                        })}
                                        className="form-control" 
                                        value={cImg}/>
                                        {errors.carImg?.message}

                                    </Col>
                                </Row>

                                <Row style={{ padding: "10px" }}>
                                    <Col md="5">Passengers</Col>
                                    <Col>
                                        <input type="hidden" {...register('carPass')} />
                                        <Dropdown isOpen={dropdownOpenPass} toggle={togglePass}>
                                            <DropdownToggle caret style={{ width: '40%', backgroundColor: 'white', color: 'black', border: 'none', textAlign: 'left' }}>
                                                {selectedPass || "Select"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {passRanges.map((pass, index) => (
                                                    <DropdownItem key={index} onClick={() => handlePassSelect(pass)} active={selectedPass === pass}>
                                                        {pass}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                        {errors.carPass?.message}
                                    </Col>
                                </Row>

                                <Row style={{ padding: "10px" }}>
                                    <Col md="5">Doors</Col>
                                    <Col>
                                        <input type="hidden" {...register('carDoor')} />
                                        <Dropdown isOpen={dropdownOpenDoor} toggle={toggleDoor}>
                                            <DropdownToggle caret style={{ width: '40%', backgroundColor: 'white', color: 'black', border: 'none', textAlign: 'left' }}>
                                                {selectedDoor || "Select"}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {doorRanges.map((door, index) => (
                                                    <DropdownItem key={index} onClick={() => handleDoorSelect(door)} active={selectedDoor === door}>
                                                        {door}
                                                    </DropdownItem>
                                                ))}
                                            </DropdownMenu>
                                        </Dropdown>
                                        {errors.carDoor?.message}
                                    </Col>
                                </Row>

                                <Row style={{ padding: "10px" }}>
                                    <Col md="5">Transmission</Col>
                                    <Col>
                                        <ButtonGroup>
                                            <Button onClick={() => handleTransmissionSelect("A")} active={TSelected === "A"}>Automatic</Button>
                                            <Button onClick={() => handleTransmissionSelect("M")} active={TSelected === "M"}>Manual</Button>
                                        </ButtonGroup>
                                        {errors.transmission?.message}
                                    </Col>
                                </Row>

                                <Row style={{ padding: "20px", textAlign: "end" }}>
                                    <Col>
                                        <Button onClick={toggle} style={{ width: "100px", backgroundColor: "red", fontWeight: "bold", border: "none" }}>Cancel</Button>
                                    </Col>
                                    <Col>
                                        <Button onClick={CarAU(handleSubmitCar)} style={{ width: "100px", backgroundColor: "#AAC4FF", color: "black", fontWeight: "bold", border: "none" }}>
                                            {isUpdate ? "Update" : "Add"}
                                        </Button>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>

                    </ModalBody>
                </Modal>

            </Container>
        </div>
    );
};

export default Admin;
