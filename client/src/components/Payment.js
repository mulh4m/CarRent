import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, Col, Container, Form, FormGroup, Row } from "reactstrap";
import { FaCreditCard, FaGooglePay, FaPaypal } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PaymentValidation } from "../validations/PaymentValidation";
import { IoChevronBackSharp } from "react-icons/io5";

const Payment = () => {
  const email = useSelector((state) => state.users.user.email);
  const navigate = useNavigate();

  let [cardNumber, setCardNumber] = useState("");
  let [ExpiredDate, setExpiredDate] = useState("");
  let [CVV, setCVV] = useState("");

  const {
          register,
          handleSubmit : payment,
          formState:{errors}
        }= useForm({resolver: yupResolver(PaymentValidation)});
  
  useEffect(() => {
    if (!email) navigate("/");
  }, [email, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    cardNumber: cardNumber,
    ExpiredDate: ExpiredDate,
    CVV: CVV,
  });

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "cardNumber") {
      value = value.replace(/\D/g, "").slice(0, 16);
    }

    if (name === "ExpiredDate") {
      value = value.replace(/\D/g, "").slice(0, 6);
      if (value.length > 2) {
        value = value.slice(0, 2) + "/" + value.slice(2);
      }
    }

    if (name === "CVV") {
      value = value.replace(/\D/g, "").slice(0, 3);
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    navigate("/thankyou");
    const data = {
      cardNumber,
      ExpiredDate,
      CVV
    }
    console.log(data)
  };

  const handleBack = ()=>{
    navigate("/carlist")
  }

  return (
    <div>
      <Container className="floor">
        <Row className="row-card-search background">
          <Form onSubmit={payment(handleSubmit)} className="form-card">
            <div style={{ textAlign: "center" }}>
              <Row>
                <Col md="1">
                  <Button 
                  style={{backgroundColor:"transparent", color:"black", border:"none"}}
                  onClick={handleBack}>
                    <IoChevronBackSharp/>
                  </Button>
                </Col>
                <Col>
                  <h2>Payment</h2>
                </Col>
                
              </Row>
              
            </div>

            <br />

            <div className="payment-methods">
              <button className="method">
                <FaCreditCard size={20} /> Card
              </button>
              <button className="method">
                <FaGooglePay size={20} /> Google Pay
              </button>
              <button className="method">
                <FaPaypal size={20} /> PayPal
              </button>
            </div>

            <FormGroup>
              <input
                {...register('cardNumber',{
                  value:cardNumber,
                  onChange : (e)=>setCardNumber(e.target.value)
                })}
                className="form-control"
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                placeholder="Card number"
                onChange={handleChange}
              />
              <div className="messageError">
                {errors.cardNumber?.message}
              </div>
              
            </FormGroup>

            <FormGroup>
              <input
                {...register('ExpiredDate',{
                  value:ExpiredDate,
                  onChange : (e)=>setExpiredDate(e.target.value)
                })}
                className="form-control"
                type="text"
                name="ExpiredDate"
                value={formData.ExpiredDate}
                placeholder="Expired Date (MM/YYYY)"
                onChange={handleChange}
              />
              <div className="messageError">
                {errors.ExpiredDate?.message}
              </div>
            </FormGroup>

            <FormGroup>
              <input
                {...register('CVV',{
                  value:CVV,
                  onChange : (e)=>setCVV(e.target.value)
                })}
                className="form-control"
                type="text"
                name="CVV"
                value={formData.CVV}
                placeholder="CVV"
                onChange={handleChange}
              />
              <div className="messageError">
                {errors.CVV?.message}
              </div>
              
            </FormGroup>

            <FormGroup>
              <Button type="submit" className="pay-btn">
                Pay
              </Button>
            </FormGroup>
          </Form>
        </Row>
      </Container>
    </div>
  );
};

export default Payment;
