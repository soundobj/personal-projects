//@ts-nocheck
import fs from "fs";
import fetch from "node-fetch";
import items from "../items.json";
import { prettyJSON } from "./nutrientMap";

const SPACE_DELIMITER = "%20";

const wikiAPIResquest = (food: string) =>
  `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=${food}&srwhat=text&srprop=size%7Cwordcount%7Ctimestamp%7Csnippet%7Cisfilematch`;

const canonicalURLRequest = (pageId: number) =>
  `https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${pageId}&inprop=url&format=json`;

const encodeQuery = (tokens: string[]): string => tokens.join(SPACE_DELIMITER);

/*  
    @TODO I dont understand why doing a curryRight on a method signature (item, type)
    eg fetchFruits = curryRight(fetchWikiPage)("fruit")
    does not play nicely with Promise.all;  the curried argument comes as '0' :(
    using a closure instead  
*/
const fetchWikiPage = (type: string) => (item: string, index) => {
  console.error("@_ itemout", index);
  return new Promise((resolve) => {
    // need to stagger the requests so wikipedia API does not think is a DOS attack
    setTimeout(() => {
      fetch(wikiAPIResquest(encodeQuery([type, ...item.split(" ")])), {
        method: "GET",
      })
        .then((res) => res.json())
        .then((json) => {
          let page = json.query.search.find(
            (res) => res.title.toUpperCase() === item.toUpperCase()
          );
          if (!page) {
            page = json.query.search[0];
          }
          fetch(canonicalURLRequest(page.pageid))
            .then((res) => res.json())
            .then((json) => {
              const url = json.query.pages[page.pageid].canonicalurl;
              resolve({ type, url, name: item });
            });
        });
    }, index * 3000);
  });
};

const fetchFruits = fetchWikiPage("fruit");
const fetchVegetables = fetchWikiPage("vegetable");

const foodWikiUrls = Promise.all([
  ...items.fruits.map<string>(fetchFruits),
  ...items.vegetables.map<string>(fetchVegetables),
]).then((foodWikiUrls) => {
  const output = foodWikiUrls.reduce((prev, cur) => {
    prev[cur.name] = cur.url;
    return prev;
  }, {});
  fs.writeFile("../foodWikiLinks.json", prettyJSON(output), (e) => {
    console.error("@_done,  errors:", e);
  });
});
