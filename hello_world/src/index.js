var Alexa = require('alexa-sdk');
var request = require("request");
var APP_ID = 'theapi_hello_world';

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('HelloWorldIntent');
    },

    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello, my name is Alexa');
    },

    'GetCupboardIntent': function () {
        // var speechOutput = getCupboardTemperature();
        // this.emit(':tell', speechOutput);
        //this.emit(':tell', 'I don\'t know the cupboard temperature yet.');

        var msg = getCupboardTemperature(function(speechOutput) {
                  console.log(speechOutput);
                  return speechOutput;
          //this.emit(':tell', speechOutput);
        });
        this.emit(':tell', msg);
    }
 };

 function url() {
     return "http://io.theapi.co.uk/cupboard/v0.1/index.json";
 }

 function getCupboardTemperature(callback) {
   callback("Sorry, I could not get the temperature in the cupboard");
    //  request.get(url(), function(error, response, body) {
    //      var d = JSON.parse(body)
    //      var temperature = d.temperature
    //      if (temperature > 0) {
    //          callback("The temperature in the cupboard is " + temperature);
    //      } else {
    //          callback("Sorry, I could not get the temperature in the cupboard");
    //      }
     //
    //  })
 }
