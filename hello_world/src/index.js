var Alexa = require('alexa-sdk');

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context);
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('HelloWorldIntent');
    },

    'HelloWorldIntent': function () {
        this.emit(':tell', 'Hello, my name is Alexa');
    }
 };

 exports.handler = function(event, context, callback) {
     var alexa = Alexa.handler(event, context);
     alexa.registerHandlers(handlers);
     alexa.execute();
 };
