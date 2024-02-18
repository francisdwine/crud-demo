const express = require("express");
const { User } = require("./models");
<<<<<<< HEAD
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> f3e2f3b43c843cc0ff74513752763db958fc364d
=======
const multer= require('multer')
const path=require('path')
const {v4 : uuidv4} = require('uuid')
>>>>>>> file-upload
<<<<<<< HEAD
=======
=======
>>>>>>> 8824bb649120514b7ecf54e14b0dd50c85613547
>>>>>>> f3e2f3b43c843cc0ff74513752763db958fc364d
const fs= require('fs');
const cors= require('cors')
const app = express();
const port = 3001;
app.base = "/api";
app.use(express.json());
app.use(cors())
const db = require("./models");


app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  let userFound;
  try {
    userFound = await User.findByPk(userId);
    if (!userFound) {
      res.send({ message: "user could not be found" });
      return;
    }
    res.send(userFound);
  } catch (err) {
    res.send({ message: "error finding user:" + err });
    return;
  }
});

app.delete("/api/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  User.destroy({
    where: {
      id: userId,
    },
  })
    .then(() => {
      res.send({ message: "Deleted succesffully" });
    })
    .catch((err) => {
      res.send({ message: "error deleting user: " + error });
    });
});

app.post("/api/users", async (req, res) => {
  let userInstance;

  const { firstName, lastName, age, email } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !firstName ||
    firstName.trim() === "" ||
    !lastName ||
    lastName.trim() === "" ||
    age === null ||
    age <= 0
  ) {
    res.send({error: "INVALID_INPUT", message: "Lacking Fields" });
    return;
  }
  
  try {
    const foundUser = await User.findOne({ where: { email: email } });
    
    if (foundUser) {
      console.log('hi world')
      res.send({ error: "ALREADY_EXISTS", message: "email already exists" });
      return
    }
  } catch (error) {
    console.log("error retrieving email:" + error);
    res.send({ error });
    return
  }

  try {
    userInstance = await User.create({
      firstName,
      lastName,
      age,
      email,
    });
    return res.send({ message: "success" });
  } catch (error) {
    console.log("error saving data:" + error);
    return res.send({ error });
  }
  res.send({ message: req.body.firstName });
});


app.get("/api/users", (req, res) => {
  User.findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.log(err);
    });
});


app.put("/api/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const { firstName, lastName, age, email } = req.body;
  const foundUser = await User.findOne({ where: { email: email } });
  if (
    !email ||
    !email.includes("@") ||
    !firstName ||
    firstName.trim() === "" ||
    !lastName ||
    lastName.trim() === "" ||
    age === null ||
    age <= 0
  ) {
    res.send({error: "INVALID_INPUT", message: "Lacking Fields" });
    return;
  }

  if(foundUser&&foundUser.id!=userId){
    
    res.send({ error: "ALREADY_EXISTS", message: "email already taken" });
    return
  }

  User.update({firstName,lastName,age,email},{where:{
    id:userId
  }})
    .then((users) => {
      res.send({message:"updated user succesfully"});
    })
    .catch((err) => {
      console.log(err);
    });
});

db.sequelize.sync({alter:true}).then(() => {
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
