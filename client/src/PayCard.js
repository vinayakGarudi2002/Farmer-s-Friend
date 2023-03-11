import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckoutForm from './components/Profile/Wishlist/payment';
import './components/Profile/Wishlist/payemeny.css';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const promise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");
function Card1(prams) {
    return (
      <div className="App">
        <Elements stripe={promise}>
          <CheckoutForm prams={prams}/>
        </Elements>
      </div>
    );
  }
function PayCard(prams) {
   return (
     <div className="App">
      <Card1 prams={prams}/>
     </div>
   );
 }
 export default PayCard;