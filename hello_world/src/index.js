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
        var that = this;
        var speechOutput = 'Request test';
        request.get(url(), function(error, response, body) {
            console.log(body);
            var d = JSON.parse(body);
            if (d.temperature) {
                 that.emit(':tell', "The temperature in the cupboard is " + d.temperature);
             } else {
                 that.emit(':tell', "Sorry, I could not get the temperature in the cupboard");
             }
        });
    }
 };

 function url() {
     return "http://io.theapi.co.uk/cupboard/v0.1/index.json";
 }
