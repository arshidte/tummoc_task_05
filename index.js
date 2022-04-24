const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/userModel");
const City = require("./models/cityModel");

const app = express();
dotenv.config();
connectDB();
app.use(express.json());
app.use(cors());

// Start server 'npm start'
// Cities available in the collection are New York, Washington DC, Mumbai, Kolkata. Type any of them.
// The server is running in port 5000.
// Call '/user' and enter your name, email, age, city and occupation.
// Call '/fetchdata' and pass the email as json through body so that your can find the details you entered through '/user' with populated data of city.
// Given the reference of city collection from user collection.
// The users already available in the database are user01@eg.com, user02@eg.com, user03@eg.com, user04@eg.com, user05@eg.com and arshid@eg.com

app.post("/user", async (req, res) => {
  try {
    const { name, email, age, city, occupation } = req.body;

    const cityOfUser = await City.findOne({ name: city });

    const emailExists = await User.findOne({ email });

    if(emailExists){
      return res.status(404).send("Email already exists")
    }

    if(!cityOfUser){
      return res.status(404).send("City not found in collection")
    }

    const user = await User.create({
      name: name,
      email: email,
      age: age,
      city: cityOfUser._id,
      occupation: occupation,
    });

    if (user) {
      res.status(200).json({
        name: user.name,
        age: user.age,
        city: user.city,
        occupation: user.occupation,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

//Fetch data and populate values
app.get("/fetchdata", async (req, res) => {
  const { email } = req.body;

  const userDetails = await User.findOne({ email }).populate("city");

    if(userDetails){
      res.status(200).json(userDetails)
    }else{
      res.status(401).json("Some error occured")
    }
});

app.listen(5000, () => {
  console.log("Server is running in port 5000");
});
