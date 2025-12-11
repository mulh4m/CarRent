import { Container, Row, Col, FormGroup, Label, Button, Form } from 'reactstrap';
import Logo from '../assets/logocar.png';
import { UserRegisterSchemaValidation } from '../validations/UserRegisterSchemaValidation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { addUser } from '../features/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uname, setUname] = useState('');
  const [phone, setPhone] = useState('');

  const message = useSelector((state) => state.users.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: submitForm,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserRegisterSchemaValidation),
  });

  const validate = async () => {
    // Phone must start with 9 or 7
    const phonePattern = /^([97])[0-9]{7}$/;

    if (!phonePattern.test(phone)) {
      alert("Phone number must start with 9 or 7 .");
      return;
    }

    const data = {
      uname,
      email,
      password,
      phone,
    };

    try {
      const resultAction = await dispatch(addUser(data));
      const serverMessage = resultAction.payload;

      if (serverMessage === "Success") {
        navigate("/home");
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <Container className="floor">
        <Row className="div-row">
          <Col md="6" className="div-col">
            <Form className="div-form">
              <div style={{ textAlign: "center" }}>
                <img alt="Logo" className="img-fluid" style={{ height: "200px" }} src={Logo} />
              </div>

              <FormGroup>
                <input
                  {...register("uname", {
                    value: uname,
                    onChange: (e) => setUname(e.target.value),
                  })}
                  placeholder={errors.uname?.message || "User name"}
                  type="text"
                  className={`form-control ${errors.uname ? "error-placeholder" : ""}`}
                />
              </FormGroup>

              <FormGroup>
                <input
                  {...register("email", {
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                  })}
                  placeholder={errors.email?.message || "Email"}
                  type="email"
                  className={`form-control ${errors.email ? "error-placeholder" : ""}`}
                />
                <div
                  style={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: "5px",
                    fontSize: "12px",
                  }}
                >
                  {message}
                </div>
              </FormGroup>

              <FormGroup>
                <div className="input-group md-3">
                  <span className="input-group-text">+968</span>
                  <input
                    {...register("phone", {
                      value: phone,
                      onChange: (e) => setPhone(e.target.value),
                    })}
                    placeholder={errors.phone?.message || "Phone Number"}
                    type="number"
                    className={`form-control ${errors.phone ? "error-placeholder" : ""}`}
                  />
                </div>
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    paddingTop: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {errors.phone?.message}
                </p>
              </FormGroup>

              <FormGroup>
                <input
                  {...register("password", {
                    value: password,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  placeholder="Password"
                  type="password"
                  className={`form-control ${errors.password ? "error-placeholder" : ""}`} />
                <p
                  style={{
                    color: "red",
                    textAlign: "center",
                    paddingTop: "5px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  {errors.password?.message}
                </p>
              </FormGroup>

              <FormGroup style={{ textAlign: "center" }}>
                <Button
                  onClick={submitForm(validate)}
                  className="form-control"
                  style={{
                    backgroundColor: "#AAC4FF",
                    border: "none",
                    color: "black",
                    width: "100px",
                  }}
                >
                  Sign Up
                </Button>
              </FormGroup>

              <FormGroup className="text-center">
                <Label>
                  Having an Account? <Link className="link" to="/">Sign in</Link>
                </Label>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
