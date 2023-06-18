const express = require("express");
const path = require("path");
const fs = require("fs").promises;
const app = express();
const port = 3000;

// Static files
app.use(express.static("public"));
app.use("/css", express.static(path.join(__dirname, "public/css")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/chapters", express.static(path.join(__dirname, "public/chapters")));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  try {
    // Fetch the surahs data from a local file in the chapters folder
    const filePath = path.join(__dirname, "public/chapters/en/index.json");
    const fileData = await fs.readFile(filePath, "utf8");
    const surahs = JSON.parse(fileData);

    res.render("index", { surahs });
  } catch (error) {
    console.error("Error fetching surahs:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/:id(\\d+)", async (req, res) => {
  const surahId = req.params.id;
  if (surahId > 114) {
    res.send("Sorry, something went wrong"); // Send 404 status code for non-numeric ids
  } else {
    try {
      // Fetch the surahs data from a local file in the chapters folder
      const filePath = path.join(
        __dirname,
        `public/chapters/en/${surahId}.json`
      );
      const fileData = await fs.readFile(filePath, "utf8");
      const surah = JSON.parse(fileData);

      res.render("surahs", { surah, title: "Quran.com" }); // Pass surahId as a parameter
    } catch (error) {
      console.error("Error fetching surahs:", error);
      res.status(500).send("Internal Server Error");
    }
  }
});

app.get("/:id", (req, res) => {
  res.send("Sorry, something went wrong"); // Send 404 status code for non-numeric ids
});

app.listen(port, () => console.log("Listening on port " + port));
