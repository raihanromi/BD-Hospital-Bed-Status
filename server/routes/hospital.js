const router = require("express").Router();
const axios = require("axios");
const cheerio = require("cheerio");

router.post("/information", async (req, res) => {
  const url = process.env.URL;
  const html = await axios.get(url);
  const $ = cheerio.load(html.data);
  const rows = $("table tr");

  let rowDataList = [];

  rows.each((index, element) => {
    if (index > 1) {
      const row = $(element);
      if (
        row.find("td").eq(13).text().trim() !== "" ||
        row.find("td").eq(14).text().trim() !== ""
      ) {
        const rowData = {
          divison: row.find("td").eq(1).text(),
          district: row.find("td").eq(2).text(),
          hospital_name: row.find("td").eq(3).text(),
          total_bed: row.find("td").eq(13).text().trim(),
          occupied_beds: row.find("td").eq(14).text().trim(),
          last_updated: row.find("td").eq(17).text().trim(),
        };

        rowDataList.push(rowData);
      }
    }
  });

  rowDataList.pop();
  //res.json(rowDataList);
  //console.log(rowDataList.length);

  if (req.body.division || req.body.district || req.body.hospital_name) {
    const filterResponse = rowDataList.filter((item) => {
      return (
        (!req.body.division || item.division === req.body.division) &&
        (!req.body.district || item.district === req.body.district) &&
        (!req.body.hospital_name || item.hospital_name === req.body.hospital_name)
      );
    });
    res.json(filterResponse);
  } else {
    res.json(rowDataList);
  }
});

module.exports = router;
