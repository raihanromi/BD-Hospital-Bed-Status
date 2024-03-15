const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { translate } = require("google-translate-api-browser");
const hospitalRoute = require("./routes/hospital");


dotenv.config();
app.use(express.json());

app.get("/", (req, res) => {
  res.json("welcome");
});



app.post("/translate", async (req, res) => {
  try {
    const { text, targetLang } = req.body;

    const response = await translate(text, { to: targetLang });
    console.log(response.text);
    res.json(response.text);
  } catch (err) {
    console.error("Error occurred during translation:", err);
    res
      .status(500)
      .json({ error: "Internal server error.", originalError: err });
  }
});

//TO get the hospital information
app.use("/hospital", hospitalRoute);

app.listen(8000, () => {
  console.log(`Server running on`);
});
