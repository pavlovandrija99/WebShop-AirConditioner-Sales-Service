import dotenv from "dotenv";
import Stripe from "stripe";
import { updateOrderToPaidStripe } from "./orderController.js";

dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY);

const createCheckoutSession = async (req, res) => {

  const customer = await stripe.customers.create({
    metadata: {
      orderId: req.body.orderId,
      userId: req.body.userId,
    },
  });

  const line_items = req.body.orderItems.map((item) => {
    return {
      price_data: {
        currency: "eur",
        product_data: {
          name: item.name,
          metadata: {
            id: item.product,
          },
        },
        unit_amount: item.price.substring(0, item.price.indexOf("€")) * 100,
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "eur",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "eur",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 1,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    customer: customer.id,
    line_items,
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/profile`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
  });

  res.send({ url: session.url });
};

// Stripe Webhook

// This is your Stripe CLI webhook secret for testing your endpoint locally.

const stripeWebhook = (req, res) => {
  const signature = req.headers['stripe-signature']

  let data
  let eventType
  let endpointSecret
  endpointSecret = process.env.STRIPE_WEBHOOK

  if (endpointSecret) {
    let event

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        endpointSecret
      )
      console.log('Webhook verified.')
    } catch (err) {
      console.log(`Webhook signature verification failed:  ${err}`)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(`Webhook Error: ${err.message}`)
    }
    // Extract the object from the event.
    data = event.data.object
    eventType = event.type
  } else {
    // retrieve the event data directly from the request body.
    data = req.body.data.object
    eventType = req.body.type
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then(async (customer) => {
        try {
          /*console.log(`customer: ${JSON.stringify(customer)}`);
          console.log(`data: ${JSON.stringify(data)}`);*/

          updateOrderToPaidStripe(customer.metadata);

        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => console.log(err));
  }

  res.send().end();
};

export { createCheckoutSession, stripeWebhook };
