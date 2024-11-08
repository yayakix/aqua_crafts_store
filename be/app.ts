import express, { Express, Request, Response } from "express";
import Stripe from "stripe";

import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to the API" });
});
const YOUR_DOMAIN = "http://localhost:3000";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;
  console.log("amount", amount);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Dynamic Product", // Name of the product (you can make it dynamic)
          },
          unit_amount: amount * 100, // Amount in cents (e.g., $10 is 1000 cents)
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success`, // Redirect URL on success
    cancel_url: `${YOUR_DOMAIN}/cancel`,
  });
  console.log("here");
  res.json(session);
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
