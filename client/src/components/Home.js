import { Container, Row } from 'reactstrap';
import Search from './Search';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CarList from './CarList';


const Home = () => {
    const email = useSelector((state) => state.users.user.email);
    const navigate = useNavigate();
    useEffect(() => {
        if (!email)
            navigate("/");
    }, [email]);
    return (
        <Container>
            <Row>
                <Search/>
            </Row>
        </Container>
    )
}
export default Home;