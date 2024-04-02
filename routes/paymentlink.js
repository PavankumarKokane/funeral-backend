const express = require("express");
const routes = express.Router();
const stripe = require('stripe')('sk_test_51OYoCGSC6FaG6uzPLFYceAi7l8aLnodJJ8veLHxvHqeDXPN2qUeClZ6TrZl0hc5Jcm4M0oFyjmSVHEu2Ko6elH0A00YGMj2SAZ');

routes.post('/', async (req, res) => {
  const { amount, currency, description } = req.body;
  console.log( amount, currency, description);
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: description,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'https://www.google.com/',
      cancel_url: 'https://www.facebook.com/',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = routes;