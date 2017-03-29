/**
 * Use the Amazon Echo to control the esp8266 
 * as though it were a Belkin WeMo device
 * 
 * Libraries required:
 * https://github.com/me-no-dev/ESPAsyncTCP
 * https://github.com/me-no-dev/ESPAsyncWebServer
 * https://github.com/me-no-dev/ESPAsyncUDP
 * https://bitbucket.org/xoseperez/fauxmoesp
 * 
 * Example adapted from:
 * https://learn.adafruit.com/easy-alexa-or-echo-control-of-your-esp8266-huzzah/software-setup
 * 
 */
 
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include "fauxmoESP.h"

// Include the Denbit library.
#include <Denbit.h>
// Initialize the denbit.
Denbit denbit;

 
fauxmoESP fauxmo;
 

void callback(uint8_t device_id, const char * device_name, bool state) {

  if (device_id == 0) {
    if (state) {
      Serial.println("RED ON");
      digitalWrite(DENBIT_RED, HIGH);
    } else {
      digitalWrite(DENBIT_RED, LOW);
      Serial.println("RED OFF");
    }
  }
  else if (device_id == 1) {
    if (state) {
      Serial.println("GREEN ON");
      digitalWrite(DENBIT_GREEN, HIGH);
    } else {
      digitalWrite(DENBIT_GREEN, LOW);
      Serial.println("GREEN OFF");
    }
  }
  
  Serial.print("Device ");  Serial.print(device_name); 
  Serial.print(" state: ");
  if (state) {
    Serial.println("ON");
  } else {
    Serial.println("OFF");
  }
}
 
void setup() {
    // Init serial port and clean garbage
    Serial.begin(115200);
    Serial.println("FauxMo demo sketch");
    Serial.println("After connection, ask Alexa/Echo to 'turn <devicename> on' or 'off'");
 
    denbit.WifiBegin();
    Serial.printf("[WIFI] STATION Mode, SSID: %s, IP address: %s\n", WiFi.SSID().c_str(), WiFi.localIP().toString().c_str());

 
    // Fauxmo
    fauxmo.addDevice("red light");
    fauxmo.addDevice("green light");
    fauxmo.onMessage(callback);

    //digitalWrite(DENBIT_RED, HIGH);
}
 
void loop() {
  fauxmo.handle();
}

