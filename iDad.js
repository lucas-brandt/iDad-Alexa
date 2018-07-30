"use strict";

const https = require('https');
var Alexa = require("alexa-sdk");
var dadCheers = ["Touchdown!", "Nice job champ.", "Good work sport.", "Homerun!", "Good job, they don't make them like they used to."];

function getDadJoke(callback) {
  https.get("https://icanhazdadjoke.com/slack", (resp) => {
    let jokeResp = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      jokeResp += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      callback(JSON.parse(jokeResp).attachments[0].text, false);
    });
  }).on("error", (err) => {
    console.log("Error: " + err.message);
    callback("Sorry, iDad couldn't think of a joke.", true);
  });  
}

function getDadCheer() {
  return dadCheers[Math.floor(Math.random()*dadCheers.length)];
}

var handlers = {
  "HelloIntent": function () {
    this.response.speak("Hello son or daughter, I'm iDad!"); 
    this.emit(':responseReady');
  },
  "ByeIntent": function () {
    this.response.speak("See ya later, Alligator!"); 
    this.emit(':responseReady');
  },
  "WhatsUpIntent": function () {
    this.response.speak("The sky."); 
    this.emit(':responseReady');
  },
  "HeyIntent": function () {
    this.response.speak("Hay is for horses."); 
    this.emit(':responseReady');
  },
  "YoIntent": function () {
    this.response.speak("Yo-yo."); 
    this.emit(':responseReady');
  },
  "CheerIntent": function () {
    this.response.speak(getDadCheer()); 
    this.emit(':responseReady');
  },
  "JokeIntent": function () {
    getDadJoke((response) => {
      this.response.speak(response); 
      this.emit(':responseReady');
    });
  },
  "LaunchRequest": function () {
    this.response.speak("iDad activated."); 
    this.emit(':responseReady');
  }
};

exports.handler = function(event, context, callback){
  var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};