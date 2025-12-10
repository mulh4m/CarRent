import { Container, Row, Col, FormGroup, Label, Button, Form } from 'reactstrap';
import Logo from '../assets/logocar.png';
import { UserSchemaValidation } from '../validations/userSchemaValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { getUser, clearMessage } from '../features/UserSlice';
import {useDispatch,useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const Login = () => {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    const dispatch=useDispatch();
    const user=useSelector((state)=>state.users.user || {});
    const message=useSelector((state)=>state.users.message);
    const isSuccess=useSelector((state)=>state.users.isSuccess);
    const navigate=useNavigate();

    const {
        register,
        handleSubmit: submitForm,
        formState: { errors }
    } = useForm({ resolver: yupResolver(UserSchemaValidation) });

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const validate = async() => {
        const data={
            email:email,
            password:password,
        }
        await dispatch(getUser(data));
    }

    useEffect(()=>{
        if(user && user.email && isSuccess){
            navigate("/home");
        }
    },[user,isSuccess,navigate]);

    return (
        <div>
            <Container className='floor'>
                <Row className='div-row'>
                    <Col md='6' className='div-col ' >
                    
                        <Form className='div-form ' >
                            <div style={{textAlign:"center"}}>
                                <img alt='Logo' className='img-fluid' style={{height:"200px"}}  src={Logo}/>
                            </div>
                            <FormGroup>
                                <input
                                    {...register('email', {
                                        value: email,
                                        onChange: (e) => setEmail(e.target.value)
                                    })}
                                    placeholder={errors.email?.message ? errors.email?.message : "Email"}
                                    type='email' className={`form-control ${errors.email ? 'error-placeholder' : ''}`}  />
                            </FormGroup>
                            <FormGroup>
                                <input
                                    {...register('password', {
                                        value: password,
                                        onChange: (e) => setPassword(e.target.value)
                                    })}
                                    placeholder={errors.password?.message ? errors.password?.message : "Password"}
                                    type='password' className={`form-control ${errors.password ? 'error-placeholder' : ''}`} />
                                    {message && (
                                    <div style={{
                                        color: 'red',
                                        fontWeight: "bold",
                                        textAlign: "center",
                                        paddingTop: "5px",
                                        fontSize:"12px"
                                    }}>
                                        {message}
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup style={{textAlign:"center"}}>
                                <Button
                                    onClick={submitForm(validate)}
                                    className='form-control'
                                    style={{backgroundColor:"#AAC4FF", border: "none", color: "black", width: "100px"}}>
                                    Sign In
                                </Button>
                            </FormGroup>
                            <FormGroup className='text-center'>
                                <Label>No Account? <Link className='link' to='/register'>Sign Up </Link></Label>
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;