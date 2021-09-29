const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
const { collegeModel } = require("./connector");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req, res) => {
  res.status(200).send("HELLO WORLD");
});

// solution starts


app.post("/findColleges", async (req, res) => {
  try {
    let { name, state, city, minPackage, maxFees, course, exam } = req.body;
    if (minPackage != undefined) {
      if (minPackage <= 0 || isNaN(minPackage))
        throw new Error("minPackage should be positive number");
    }
    if (maxFees != undefined) {
      if (maxFees <= 0 || isNaN(maxFees))
        throw new Error("maxFees should be positive number");
    }
    name = name || "";
    state = state || "";
    city = city || "";
    minPackage = minPackage || 0;
    maxFees = maxFees || Infinity;
    const query = {
      name: { $regex: new RegExp(`.*${name}.*`, "i") },
      state: { $regex: new RegExp(`.*${state}.*`, "i") },
      city: { $regex: new RegExp(`.*${city}.*`, "i") },
      minPackage: { $gte: minPackage },
      maxFees: { $lte: maxFees },
    };
    if (course) query["course"] = { $regex: new RegExp(`^${course}$`, "i") };
    if (exam) query["exam"] = { $regex: new RegExp(`^${exam}$`, "i") };
    const data = await collegeModel.find(query, {
      _id: 0,
      __v: 0,
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// solution end

module.exports = { app };
