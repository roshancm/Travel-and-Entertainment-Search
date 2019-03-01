const express = require('express');
const request = require('request');
const path = require("path");
const app = express();


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/hw-8.html"));
})
app.get('/nearby', (req, res) => {
    var kw = req.query.keyword;
    var location = req.query.location;
    var radius = req.query.distance;
    var cat = req.query.category.toLowerCase();
   console.log("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius="+radius+"&type="+cat+"&keyword="+kw+"&key=AIzaSyCPQfFU0m292Roic3LKUjkNi9GzFJd656c"); request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+location+"&radius="+radius+"&type="+cat+"&keyword="+kw+"&key=AIzaSyCPQfFU0m292Roic3LKUjkNi9GzFJd656c", (error,response,body) => {
       if(error)
           res.json(null);
        res.json(body);
    });
} );

app.get('/review', (req, res) => {
    var placeid = req.query.place_id;
    request("https://maps.googleapis.com/maps/api/place/details/json?placeid="+placeid+"&key=AIzaSyCPQfFU0m292Roic3LKUjkNi9GzFJd656c", (error,response,body) => {
        if(error)
            res.json(null);
        else
            res.json(body);
    });
} );

app.get('/geocode', (req, res) => {
    var location_text = req.query.location_text;
    request("https://maps.googleapis.com/maps/api/geocode/json?address="+location_text+"&key=AIzaSyCPQfFU0m292Roic3LKUjkNi9GzFJd656c", (error,response,body) => {
        res.json(body);
    });
} );

app.get('/yelp', (req, res) => {
    var name = req.query.name;
    var address1 = req.query.address1;
    var city = req.query.city;
    var state = req.query.state;
    var country = req.query.country;
    req.headers['Authorization'] = 'Bearer <i4X82U2qnwO0MH3OrDXwZ7jRc82GRTRcsaEzb8b95ZGbMVZmeV8lGNguegzo8Tr3tlFY9xQoHzbgKWAoqG4ODPdnq3mLCV8rdYdssylMD2u1OLlgl3Af9ud34u3BWnYx>';
    request("https://api.yelp.com/v3/businesses/matches/best?name="+name+"&address1="+address1+"&city="+city+"&state="+state+"&country="+country, (error,response,body) => {
        if(error || (typeof body == "undefined") || body.length == 0)
            {
                res.json(null);
            }
        else
            {
        body = JSON.parse(body);
        if((typeof body["businesses"] == "undefined") || (body["businesses"].length == 0) || (typeof body.businesses[0] == "undefined"))
            {
            res.json(null);
            }
            else
                {
        
        console.log("https://api.yelp.com/v3/businesses/{"+body.businesses[0].id+"}/reviews");
        if(name == body.businesses[0].name){
 request("https://api.yelp.com/v3/businesses/"+body.businesses[0].id+"/reviews",(error,response,body1) => {
     console.log(body1);   
     res.json(body1);
 }).auth(null,null,true,"i4X82U2qnwO0MH3OrDXwZ7jRc82GRTRcsaEzb8b95ZGbMVZmeV8lGNguegzo8Tr3tlFY9xQoHzbgKWAoqG4ODPdnq3mLCV8rdYdssylMD2u1OLlgl3Af9ud34u3BWnYx");
        }
        else{
            res.json(null);
        }
                } }}).auth(null,null,true,"i4X82U2qnwO0MH3OrDXwZ7jRc82GRTRcsaEzb8b95ZGbMVZmeV8lGNguegzo8Tr3tlFY9xQoHzbgKWAoqG4ODPdnq3mLCV8rdYdssylMD2u1OLlgl3Af9ud34u3BWnYx");
 
            });

app.get('/pagination', (req, res) => {
    var page_token = req.query.page_token;
    request("https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken="+page_token+"&key=AIzaSyCPQfFU0m292Roic3LKUjkNi9GzFJd656c", (error,response,body) => {
        if(error || body == undefined)
            res.json(null);
        else
            res.json(body);
    });
} );


app.listen(8081);