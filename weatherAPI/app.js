const express = require("express");
const app = express();
const ejs = require("ejs");
const https = require("https");

//using from there-->https://www.npmjs.com/package/node-fetch
//此方式只適用於node-fetch 2.6.0版本
const fetch = require("node-fetch");

//api key
const myKey = "3cfd152d8e77068dfd1f572b38b11e17";

//function換算溫度(絕對溫度到攝氏溫度)
function tempKToC(k) {
  return (k - 273.15).toFixed(2);
}

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

//取得城市的資料
app.get("/:city", async (req, res) => {
  let { city } = req.params;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`;
  // let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${myKey}`;

  // let data = await fetch(url);
  // let dataJson = data.json();

  // ------取得request made by "node.js" 方法一 --------------------------------------------
  let data = await fetch(url);
  let djs = await data.json();
  let { temp } = djs.main;
  let tempC = tempKToC(temp);
  res.render("weather.ejs", { djs, tempC });

  // fetch(url)
  //     .then((data)=>data.json())
  //     .then((djs)=>{
  //         let {temp} = djs.main;
  //         let tempC = tempKToC(temp);
  //         res.render("weather.ejs", {djs, tempC});
  //     });

  // ------取得request made by "node.js" 方法二 --------------------------------------------
  // https.get(url, (response)=>{
  //     console.log("statusCode: ", response.statusCode );
  //     console.log("headers: ", response.headers);

  //     response.on('data', (data)=>{
  //         let djs = JSON.parse(data);
  //         // console.log("dataJson: ", djs);
  //         let {temp} = djs.main;
  //         let tempC = tempKToC(temp);
  //         res.render("weather.ejs", {djs, tempC});
  //     });
  // }).on("error", (err)=>{
  //     console.log(err);
  // });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
