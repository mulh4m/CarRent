import { Button, Col, Container, Form, Label, Row, Modal, ModalHeader, ModalBody, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SearchValidation } from "../validations/SearchValidation";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Seacrh=()=>{
    

    let [pickupLocation, setPickupLocation] = useState('');
    let [returnLocation, setReturnLocation] = useState('HQ');
    let [pickupDate, setPickupDate] = useState('');
    let [returnDate, setReturnDate] = useState('');
    let [pickupTime, setPickupTime] = useState('');
    let [returnTime, setReturnTime] = useState('');
    let [pickupCoords, setPickupCoords] = useState(null);
    let [returnCoords, setReturnCoords] = useState(null);
    let [showPickupMap, setShowPickupMap] = useState(false);
    let [showReturnMap, setShowReturnMap] = useState(false);
    let [dropdownOpenAge, setDropdownOpenAge] = useState(false);
    let [dropdownOpenRegion, setDropdownOpenRegion] = useState(false);
    let [searchQuery, setSearchQuery] = useState('');
    let [selectedAge, setSelectedAge] = useState('Age');
    let [selectedRegion, setSelectedRegion] = useState('Region');
    
    

    const omanCenter = [23.5880, 58.3829];
    const navigate=useNavigate();


    const ageRanges = [
        'I\'m 18',
        'I\'m 19',
        'I\'m 20',
        'I\'m 21',
        'I\'m 22',
        'I\'m 23',
        'I\'m 24+'
    ];

    const regionWorld = [
        "Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua \& Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia \& Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship",
        "Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica",
        "Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay",
        "Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre \, Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts \& Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad \& Tobago","Tunisia","Turkey","Turkmenistan",
        "Turks \& Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"
    ]

    const searchLocation = async (query, isPickup) => {
        if (!query) return;
        
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${query}, Oman&limit=5`
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                const coords = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
                const address = data[0].display_name;
                
                if (isPickup) {
                    setPickupCoords(coords);
                    setPickupLocation(address);
                } else {
                    setReturnCoords(coords);
                    setReturnLocation(address);
                }
            }
        } catch (error) {
            console.error("Error searching location:", error);
        }
    };

    //Validation
    const {
        register,
        handleSubmit : searchCar,
        setValue,
        trigger,
        formState:{errors}
    }= useForm({resolver: yupResolver(SearchValidation)});

    const LocationMarker = ({ isPickup }) => {
        useMapEvents({
            click(e) {
                const { lat, lng } = e.latlng;
                const coords = [lat, lng];
                
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then(res => res.json())
                    .then(data => {
                        const address = data.display_name;
                        if (isPickup) {
                            setPickupCoords(coords);
                            setPickupLocation(address);
                        } else {
                            setReturnCoords(coords);
                            setReturnLocation(address);
                        }
                    });
            },
        });
        return null;
    };

    const togglePickupMap = () => setShowPickupMap(!showPickupMap);
    const toggleReturnMap = () => setShowReturnMap(!showReturnMap);
    const toggleAge = () => setDropdownOpenAge((prevState) => !prevState);
    const toggleRegion = () => setDropdownOpenRegion((prevState) => !prevState);

    const handleAgeSelect = (age) => {
        setSelectedAge(age);
        setValue('selectedAge',age)
        trigger('selectedAge')
    };

    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setValue('selectedRegion',region)
        trigger('selectedRegion')
    };

    const validate = async()=>{
        const data = {
            pickupLocation,
            returnLocation,
            pickupDate,
            pickupTime,
            returnDate,
            returnTime,
            selectedAge,
            selectedRegion
        }
        await console.log(data);
        await navigate("/carlist");
    }

    return(
        <div>
            <Container className='floor'>
                <Row className='row-card background'>
                    <Form className="form-card">
                        <Row className="row-input">

                            {/*PickUp Location */}

                            <Col md="3">
                                <Label>Pickup location</Label>
                                <div style={{position: 'relative'}}>
                                    <input 
                                        {...register('pickupLocation',{
                                            value:pickupLocation,
                                            onChange : (e) => setPickupLocation(e.target.value)
                                        })}

                                        value={pickupLocation}
                                        className="form-control" 
                                        placeholder="Select pickup location"
                                        onClick={togglePickupMap}
                                        readOnly
                                    />
                                    <div className="messageError">
                                        {errors.pickupLocation?.message}
                                    </div>
                                </div>
                            </Col>

                            {/*Return Location */}

                            <Col md="3">
                                <Label>Return location</Label>
                                <div style={{position: 'relative'}}>
                                    <input 
                                        className="form-control"
                                        placeholder="Select return location"
                                        value={returnLocation}
                                        onClick={toggleReturnMap}
                                        readOnly
                                    />
                                </div>
                            </Col>

                            {/*Pickup date and time */}

                            <Col md="3">
                                <Label>Pickup date and time</Label>
                                <div className="input-group">
                                    <input 
                                    {...register('pickupDate',{
                                            value:pickupDate,
                                            onChange : (e) => setPickupDate(e.target.value)
                                        })}
                                    type="date" 
                                    value={pickupDate}
                                    className="form-control"/>

                                    <input 
                                    {...register('pickupTime',{
                                            value:pickupTime,
                                            onChange : (e) => setPickupTime(e.target.value)
                                        })}
                                    type="time" 
                                    value={pickupTime}
                                    className="form-control"/>
                                    
                                </div>
                                <div className="messageError">
                                    {errors.pickupDate?.message ? errors.pickupDate?.message:  errors.pickupTime?.message }
                                </div>
                                
                            </Col>

                            {/*Return date and time */}

                            <Col md="3">
                                <Label>Return date and time</Label>
                                <div className="input-group">
                                    <input type="date" 
                                    {...register('returnDate',{
                                            value:returnDate,
                                            onChange : (e) => setReturnDate(e.target.value)
                                        })}
                                    value={returnDate} 
                                    className="form-control"/>

                                    <input type="time" 
                                    {...register('returnTime',{
                                            value:returnTime,
                                            onChange : (e) => setReturnTime(e.target.value)
                                        })}
                                    value={returnTime}  
                                    className="form-control"/>
                                    
                                </div>
                                <div className="messageError">
                                    {errors.returnDate?.message ? errors.returnDate?.message :errors.returnTime?.message}
                                </div>
                                
                            </Col>
                        </Row>
                        <Row className="row-input">

                            {/*Age */}

                            <Col md="3">
                                
                                <input type="hidden" {...register('selectedAge')} />
                                <Dropdown isOpen={dropdownOpenAge} toggle={toggleAge}>
                                    <DropdownToggle  
                                        caret 
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            border: 'none',
                                            textAlign: 'left'
                                        }}
                                    >{selectedAge}</DropdownToggle>
                                    <DropdownMenu >
                                        <DropdownItem
                                        />
                                        {ageRanges.map((age, index) => (
                                            <DropdownItem 
                                                key={index}
                                                onClick={() => handleAgeSelect(age)}
                                                active={selectedAge === age}
                                            >
                                            {age}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <div className="messageError">
                                    {errors.selectedAge?.message}
                                </div>
                                
                            </Col>

                            {/*Region */}
                            
                            <Col md="6">
                                
                                <input type="hidden" {...register('selectedRegion')} />
                                <Dropdown isOpen={dropdownOpenRegion} toggle={toggleRegion}
                                className="dropdown" 
                                >
                                    <DropdownToggle 
                                        caret 
                                        style={{
                                            width: '100%',
                                            backgroundColor: 'white',
                                            color: 'black',
                                            border: 'none',
                                            textAlign: 'left'
                                        }}
                                    >{selectedRegion}</DropdownToggle>
                                    <DropdownMenu style={{
                                        maxHeight: '300px',
                                        overflowY: 'auto',
                                        width: '100%'
                                    }}>
                                        <DropdownItem/>
                                        {regionWorld.map((region, index) => (
                                            <DropdownItem 
                                                key={index}
                                                onClick={() => handleRegionSelect(region)}
                                                active={selectedRegion === region}
                                            >
                                                {region}
                                            </DropdownItem>
                                        ))}
                                    </DropdownMenu>
                                </Dropdown>
                                <div className="messageError">
                                    {errors.selectedRegion?.message}
                                </div>
                            </Col>
                            <Col md="" style={{textAlign: "right"}}> 
                                <Button className="form-control" 
                                style={{backgroundColor:"#AAC4FF", border: "none", color: "black", width: "150px"}} onClick={searchCar(validate)}>Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Container>

            <Modal isOpen={showPickupMap} toggle={togglePickupMap} size="lg">
                <ModalHeader toggle={togglePickupMap}>
                    Select Pickup Location
                </ModalHeader>
                <ModalBody>
                    <div style={{marginBottom: '10px'}}>
                        <input 
                            className="form-control" 
                            placeholder="Search location in Oman"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    searchLocation(searchQuery, true);
                                }
                            }}
                        />
                        <Button 
                            onClick={() => searchLocation(searchQuery, true)}
                            style={{
                                marginTop: '5px',
                                backgroundColor: '#AAC4FF',
                                border: 'none',
                                color: 'black'
                            }}
                        >
                            Search
                        </Button>
                    </div>
                    <MapContainer 
                        center={pickupCoords || omanCenter} 
                        zoom={pickupCoords ? 13 : 6} 
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <LocationMarker isPickup={true} />
                        {pickupCoords && (
                            <Marker position={pickupCoords}>
                                <Popup>Pickup Location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                    {pickupLocation && (
                        <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px'}}>
                            <strong>Selected:</strong> {pickupLocation}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={togglePickupMap}>
                        Cancel
                    </Button>
                    <Button 
                        style={{backgroundColor: '#AAC4FF', border: 'none', color: 'black'}}
                        onClick={togglePickupMap}
                        disabled={!pickupCoords}
                    >
                        Confirm Location
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={showReturnMap} toggle={toggleReturnMap} size="lg">
                <ModalHeader toggle={toggleReturnMap}>
                    Select Return Location
                </ModalHeader>
                <ModalBody>
                    <div style={{marginBottom: '10px'}}>
                        <input 
                            className="form-control" 
                            placeholder="Search location in Oman"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    searchLocation(searchQuery, false);
                                }
                            }}
                        />
                        <Button 
                            onClick={() => searchLocation(searchQuery, false)}
                            style={{
                                marginTop: '5px',
                                backgroundColor: '#AAC4FF',
                                border: 'none',
                                color: 'black'
                            }}
                        >
                            Search
                        </Button>
                    </div>
                    <MapContainer 
                        center={returnCoords || omanCenter} 
                        zoom={returnCoords ? 13 : 6} 
                        style={{ height: '400px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <LocationMarker isPickup={false} />
                        {returnCoords && (
                            <Marker position={returnCoords}>
                                <Popup>Return Location</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                    {returnLocation && (
                        <div style={{marginTop: '10px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px'}}>
                            <strong>Selected:</strong> {returnLocation}
                        </div>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" onClick={toggleReturnMap}>
                        Cancel
                    </Button>
                    <Button 
                        style={{backgroundColor: '#AAC4FF', border: 'none', color: 'black'}}
                        onClick={toggleReturnMap}
                        disabled={!returnCoords}
                    >
                        Confirm Location
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default Seacrh;