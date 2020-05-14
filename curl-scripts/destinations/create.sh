#!/bin/bash

API="http://localhost:4741"
URL_PATH="/destinations"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "destination": {
      "city": "'"${CITY}"'",
      "country": "'"${COUNTRY}"'",
      "latitude": "'"${LAT}"'",
      "longitude": "'"${LONG}"'",
      "rating": "'"${RATING}"'"
    }
  }'

echo
