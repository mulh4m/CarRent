import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, Container, Row, Form } from "reactstrap";
import { useSelector } from "react-redux";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const email = useSelector((state) => state.users.user.email);

    /*useEffect(() => {
      if (!email)
        navigate("/");
    }, [email]);*/

  return (
    <div>
      <Container className="floor" >
        <Row className="row-card-search background" style={{padding:"130px"}}>
            <Form className="form-card" style={{textAlign:"center", padding:"100px"}}>
                <h2>Thank you for your payment!</h2>
                <p>We appreciate your trust in us. Enjoy your ride 🚗</p>
                <Button onClick={() => navigate("/")}>Return Home</Button>
            </Form>
        </Row>
        
      </Container>
    </div>
  );
};

export default ThankYouPage;
