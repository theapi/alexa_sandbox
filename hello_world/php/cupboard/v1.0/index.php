<?php
require_once 'config.php';

try {
  $context = stream_context_create(
    array(
      'http' => array(
        'timeout' => 1
      )
    )
  );
  $json = file_get_contents($config["cupboard_url"], 0, $context);
  $data = json_decode($json);
  if (isset($data->temperature)) {
    $text = "The temperature in the cupboard is $data->temperature degrees C";
  } else {
    $text = "Hmmm, The cupboard sensor didn't return any temperature data.";
  }
} catch (Exception $e) {
  $text = "I couldn't get the temperature from the sensor in the cupboard.
  It said; " . $e->getMessage();
}

$response = '{}
  "response": {
    "outputSpeech": {
      "type": "PlainText",
      "text": "' . $text . '"
    }
  }
}';

header('Content-Type: application/json');
print $response;
