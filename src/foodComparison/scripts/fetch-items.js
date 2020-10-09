var fs = require("fs");
var fetch = require("node-fetch");
var items = require("../items.json");
var _ = require("lodash");

var itemsToFetch = _.concat(items.fruits, items.vegetables);

const headers = {
  username: "soundobj@yahoo.com",
  "x-app-id": "32d394a1",
  "x-app-key": "52f6dec933a65566c33abcfab9dc6e6e",
  "content-type": "application/json",
};

const body = {
  query: "foo",
};

const callback = function (item, e) {
  console.error(`@_done item:${item} errors:`, e);
};

const getFilePath = (item) => `../foods/${item}.json`;

const fetchItem = (item) => {
  body.query = item;

  fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
    method: "POST",
    body: JSON.stringify(body),
    headers: headers,
  })
    .then((res) => res.json()) // expecting a json response
    .then((json) => {
      fs.writeFile(
        getFilePath(item),
        JSON.stringify(json),
        _.curry(callback)(item)
      );
    });
};
console.error('@_attemp to run fetch items',);
// itemsToFetch.forEach(fetchItem);
