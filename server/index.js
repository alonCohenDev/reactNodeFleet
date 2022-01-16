//Imports
const path = require('path');
const express = require("express");
const storage = require('node-persist');
const { v4: uuidv4 } = require('uuid');
const car = require('./Car.js');
const { json } = require('express/lib/response');


//Init
const PORT = process.env.PORT || 3001;
const app = express();
app.use(express.json());

//API

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

//Get all units
app.get("/FleetUnits", async (req, res) => {
  res.json((await storage.getItem("units")));
});

//Add new unit
app.post("/AddUnit", async (req, res) => {
  //Due to the persistent db structure I have to pull all of the units & reinsert them - would not be acceptable in prod app...
  const units = await storage.get('units')
  req.body.Id = uuidv4()
  units.push(req.body)
  await storage.set('units', units)
  res.send(req.body.Id)
});

//Delete existing unit
app.delete("/DeleteUnit", async (req, res) => {
  //Due to the persistent db structure I have to pull all of the units & reinsert them - would not be acceptable in prod app...
  const units = await storage.get('units')
  const unitToDeleteIdx = units.findIndex(obj => obj.Id == req.body.Id);
  units.splice(unitToDeleteIdx, 1);
  await storage.set('units', units)
  res.sendStatus(200)
});

//Update existing unit
app.put("/UpdateUnit", async (req, res) => {
  //Due to the persistent db structure I have to pull all of the units & reinsert them - would not be acceptable in prod app...
  const units = await storage.get('units')
  const unitToUpdateIdx = units.findIndex(obj => obj.Id == req.body.Id);
  units[unitToUpdateIdx] = req.body;
  await storage.set('units', units)
  res.sendStatus(200)
});

// All other GET requests not handled before will return our app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//Set the server
app.listen(PORT, async () => {
  await InitPersistentDB();
  console.log(`Server listening on ${PORT}`);
});



//Functions that won't exsist in prod apps...
const InitPersistentDB = async () => {
  await storage.init({});
  let units = [];
  for (let i = 0; i < 10; i++)
    units.push(new car(uuidv4(), i % 5, `Car_${i + 1}`, getRandomLatLng()))

  await storage.setItem("units", units);
}

const getRandomLatLng = () => {
  return {
    lat: Math.round((31.5 + (Math.random() * 2)) * 100) / 100,
    lng: Math.round((34.5 + (Math.random() * 1.5)) * 100) / 100
  };

}