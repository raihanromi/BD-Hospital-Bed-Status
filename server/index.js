const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

app.get("/", (req, res) => {
  res.json("welcome");
});

app.get("/hospitalinfo", async (req, res) => {
  const url = process.env.URL;

  // Fetch the HTML content of the webpage
  axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);

      // Select the rows in the table
      const rows = $("table tr");

      // Iterate over each row and extract data
      let rowDataList = [];
      rows.each((index, element) => {
        if (index > 1) {
          const row = $(element);
          if (
            row.find("td").eq(13).text().trim() !== "" ||
            row.find("td").eq(14).text().trim() !== ""
          ) {
            const rowData = {
              divison: row.find("td").eq(1).text(), // Assuming the first column (index 0) of the row
              district: row.find("td").eq(2).text(),
              facility_name: row.find("td").eq(3).text(),
              total_bed: row.find("td").eq(13).text().trim(),
              occupied_beds: row.find("td").eq(14).text().trim(),
              // Add more columns as needed
            };
            rowDataList.push(rowData);
          }
        }
      });
      rowDataList.pop();
      res.json(rowDataList);
      console.log(rowDataList.length);
    })
    .catch((error) => {
      console.log("Error fetching data:", error);
    });
});

app.listen(3000, () => {
  console.log(`Server running on`);
});
