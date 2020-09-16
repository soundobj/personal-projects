import { concat } from 'lodash';  
var items = require("../items.json");

export const getFoodDictionary = () => concat(items.fruits, items.vegetables).sort();

const typeAheadSuggestions = (dictionary: string[]) => {
  const getSuggestions = (query: string) => new Promise<string[]> ((resolve) => {
      resolve(dictionary.filter((item: string) => item.startsWith(query)));
    })

  return {
    getSuggestions
  }
}

export default typeAheadSuggestions;