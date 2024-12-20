const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allow only specific origin
const corsOptions = {
  origin: [process.env.Local_Server, process.env.Shopyfi_Server],  
  methods: ["GET", "POST"], // Specify allowed methods
  allowedHeaders: ["Content-Type"], // Specify allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());


app.post("/track", async (req, res) => {
  const { waybill } = req.body;
  console.log(waybill)
  // const waybill = 24602310084840;

  if (!waybill) {
    return res.status(400).json({ error: "Waybill is required" });
  }

  try {
    const response = await axios.get(
      `${process.env.API_URL}?waybill=${waybill}&token=${process.env.API_TOKEN}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tracking details" });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
