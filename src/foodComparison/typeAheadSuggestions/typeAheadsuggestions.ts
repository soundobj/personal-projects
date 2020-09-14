import { concat } from 'lodash';
import { ResultsFetcher } from '../../typeAhead/typeAhead';
var items = require("../items.json");

export const getFoodDictionary = () => concat(items.fruits, items.vegetables).sort();

const typeAheadSuggestions = (dictionary: string[]) => {
  const getSuggestions: ResultsFetcher = (query: string) => new Promise ((resolve: any) => {
      resolve(dictionary.filter((item: string) => item.startsWith(query)));
    })

  return {
    getSuggestions
  }
}

export default typeAheadSuggestions;