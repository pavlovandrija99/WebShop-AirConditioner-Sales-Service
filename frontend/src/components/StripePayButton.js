import axios from "axios";
import { Button } from "react-bootstrap";

const StripePayButton = ({ order }) => {
  const stripeCheckoutHandler = () => {
    axios
      .post(`/api/stripe/create-checkout-session`, {
        orderId: order._id,
        orderItems: order.orderItems,
        userId: order.user._id,
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <>
      <Button onClick={() => stripeCheckoutHandler()}>Pay With Stripe</Button>
    </>
  );
};

export default StripePayButton;
