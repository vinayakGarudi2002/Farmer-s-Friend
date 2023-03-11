import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./payemeny.css"
import { useSelector, useDispatch } from "react-redux";
import {pay} from "../../../actions/index";
import {
  CardElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {orederProducts } from '../../../services/productData'
export default function CheckoutForm(prams) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    window
      .fetch("/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({items: [{ id: "xl-tshirt" }]})
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.complete);
    setError(event.error ? event.error.message : "");
    console.log(event.complete)
    dispatch(pay(event.complete))
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setSucceeded(true);

  };

  const addtoOrederProduct =()=>{
    prams = prams.prams.prams.prams
    orederProducts(prams)
    console.log("vbnkl;'=======")
    console.log(prams)

      
  
  }

  return (
    <div className="body1">
      <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
      {/* <button
        disabled={ !disabled }
        id="submit"

        // onClick={addtoOrederProduct}
      >
        <span id="button-text" >
          {processing ? (
            <div className="spinner" id="spinner"></div>
          ) : (
            succeeded ? (<Link to="/">Success</Link>) : "pay now"
            // "all os"
          )}
        </span>
      </button> */}
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
      {/* Show a success message upon completion */}
      <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded
      </p>
    </form>
    </div>
    
  );
}