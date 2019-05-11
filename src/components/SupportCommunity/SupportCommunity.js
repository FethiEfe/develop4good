import React,{Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import style from "./SupportCommunity.module.scss"

const SupportCommunity = () => {
    const publishableKey = "pk_test_1WvbqD4kUSFbv6WUP9o1VddT00mAqXvqJJ";
   
     
    const onToken = token => {
      const body = {
        amount: 999,
        token: token
    };
    axios
        .post("/stripe/payment", body)
        .then(response => {
          console.log(response);
          alert("Payment Success");
        })
        .catch(error => {
          console.log("Payment Error: ", error);
          alert("Payment Error");
        });
    };
    return (
      <StripeCheckout
        label="Support Community" //Component button text
        name="Develop 4 Good" //Modal Header
        description="Donate to developers"
        panelLabel= "Donate" //Submit button in modal
        amount={999} //Amount in cents $9.99
        token={onToken}
        stripeKey={publishableKey}
        // image="https://www.vidhub.co" //Pop-in header image
        billingAddress={false}
        
      />
    );
  };

export default SupportCommunity