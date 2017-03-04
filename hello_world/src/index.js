var Alexa = require('alexa-sdk');
var request = require("request");
var config = require('./config.json');
var APP_ID = config.app_id;

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
        var options = {
          url: config.url,
          rejectUnauthorized: false,
          agent: false
        };
        request.get(options, function(error, response, body) {
            //console.log(body);
            var d = JSON.parse(body);
            if (d.response.outputSpeech.type = "PlainText") {
                 that.emit(':tell', d.response.outputSpeech.text);
             } else {
                 that.emit(':tell', "Sorry, I could not get the temperature in the cupboard");
             }
        });
    }
 };
