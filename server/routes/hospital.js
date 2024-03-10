const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/information", async (req, res) => {
  const url = process.env.URL;
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);

  // Select the rows in the table
  const rows = $("table tr");

  let rowDataList = [];

  // Iterate over each row and extract data
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
          last_updated: row.find("td").eq(17).text().trim(),
          // Add more columns as needed
        };

        rowDataList.push(rowData);
      }
    }
  });

  rowDataList.pop();
  res.json(rowDataList);
  console.log(rowDataList.length);

  //console.log(rowDataList[0])
});

module.exports = router;
