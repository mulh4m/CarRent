import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Container,
    Button,
    Row,
    Col,
} from 'reactstrap';
import Logo from '../assets/logocar.png';
import { useLocation, useNavigate } from 'react-router-dom';
import profile from '../assets/profile.png'
import { useDispatch, useSelector } from 'react-redux';
import { RiLogoutBoxRLine } from "react-icons/ri";

const Header = () => {
    const email=useSelector((state)=>state.users.user.email);
    const uname = useSelector((state) => state.users.user.uname);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const isAdminPage = location.pathname === '/admin';

    const handleLogin = ()=>{
        navigate("/");
    }

    const handleLogout = ()=>{
        dispatch({type: 'users/logout'});
        navigate("/");
    }

    const handleHome = ()=>{
        navigate('/home');
    }

    return (
        <Container className='floor'> 
            <Navbar className='navigation'  expand='md'>
                <NavbarBrand className='logocar'>
                    <img src={Logo} height="100px" onClick={handleHome}/>
                </NavbarBrand>
                    <Nav className="profile ms-auto" navbar>
                        <NavItem className='navs'>
                            {email || isAdminPage ? <Button style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color : "black"
                            }}
                            onClick={handleLogout}>
                                <Row>
                                    <Col md="2">
                                       <RiLogoutBoxRLine/>
                                    </Col>
                                    <Col>
                                        {uname}
                                    </Col>
                                </Row>
                            </Button>:
                            (<Button style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color : "black"
                            }} onClick={handleLogin}>
                                <Row>
                                    <Col md="2">
                                        <img src={profile} height='25px'/>
                                    </Col>
                                    <Col>
                                        Login
                                    </Col>
                                </Row>
                            </Button>)}
                        </NavItem>

                        <NavItem>

                        </NavItem>
                    </Nav>
            </Navbar>
        </Container>
    )
}
export default Header;