require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");

const authRoute = require("./Routs/AuthRoute.js");
const { holding } = require("./models/HoldingModels.js");
const { position } = require("./models/PostionsModels.js");
const { OrderModel } = require("./models/OrderModels.js");

const app = express();
const uri = process.env.MONGO_URL;
const port = process.env.PORT || 8080;

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

// CORS Setup
app.use(cors({
  origin: [
    "https://zerodha-fronted.vercel.app",
    "https://zerodha-dashboard-blush.vercel.app",
    "https://zerodhabackend-r6a5.onrender.com"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Routes
app.get('/allHoldings', async (req, res) => {
  let allHoldings = await holding.find({});
  res.json(allHoldings);
});

app.get('/allPosition', async (req, res) => {
  let allPosition = await position.find({});
  res.json(allPosition);
});

app.get('/allOrder', async (req, res) => {
  let order = await OrderModel.find({});
  res.json(order);
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode, curr } = req.body;

    if (!name || !qty || !price || !mode || !curr) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let newOrder = new OrderModel({ name, qty, price, mode, curr });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully", newOrder });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/delete/:id", async (req, res) => {
  let { id } = req.params;
  const deletedOrder = await OrderModel.findByIdAndDelete(id);

  if (!deletedOrder) {
    return res.status(404).json({ error: "Order not found" });
  }

  res.status(200).json({ message: "Order deleted successfully" });
});

// Authentication Routes
app.use('/', authRoute);

// MongoDB Connection
mongoose.connect(uri, {})
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

// Start Server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
