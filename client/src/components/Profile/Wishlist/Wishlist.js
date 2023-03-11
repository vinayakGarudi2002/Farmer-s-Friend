import { useEffect, useState } from 'react';
import ProductCard from '../../ProductCard/ProductCard';
import { Col, Row, Spinner } from 'react-bootstrap';
import { getUserWishlist } from '../../../services/userData';
import './Wishlist.css';
import CheckoutForm from './payment';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PayCard from "../../../PayCard"
import "./payemeny.css"
// const promise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");
// function Card1() {
//     return (
//       <div className="App">
//         <Elements stripe={promise}>
//           <CheckoutForm />
//         </Elements>
//       </div>
//     );
//   }
function Wishlist() {


    const [products, setProduct] = useState([])
    const [subtotal, setSubtotal] = useState([])

    let [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        getUserWishlist()
            .then(res => {
                setProduct(res.wishlist.filter(x => x.active === true));
                setSubtotal(res.sum)
                setLoading(false)
            })
            .catch(err => console.log(err))
          
    }, [setProduct, setLoading])
    console.log(products)
  const handleChange = (event) => {
    // setDisabled(event.empty);
    // setError(event.error ? event.error.message : "");
    
  };
    return (
        <>
            {!loading ?
                (<>
                    <h1 className="heading">Cart</h1>
                    {products.length > 0 ? (
                        <Row>
                            {products
                               
                                .map(x =>
                                    <Col xs={12} md={6} lg={4} key={x._id.toString()}>
                                        <ProductCard params={x} subtotal={subtotal} setSubtotal={setSubtotal} />
                                       
                                    </Col>
                                )
                            }
                        </Row>
                    ) : (
                            <p className="nothing-to-show">Nothing to show</p>
                        )}

                </>) :
                <Spinner animation="border" />}
                
                <div>
                   Subtotal ({!products.length ? 0 : `${products.length} ${products.length === 1 ? 'item' : 'items'}` }):&nbsp;
                  <span>{subtotal}</span>
                  
                </div>
            <div>
            {subtotal > 0 ? (
                        <div className="App">
                        <PayCard prams ={ products}/>
                        </div>
                    ) : (
                            <p className="nothing-to-show"></p>
                        )}
            </div>
              
               
                 

        </>
    )
}

export default Wishlist;