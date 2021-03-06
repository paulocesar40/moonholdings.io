/* eslint-disable no-param-reassign */
import * as R from 'ramda'
import { additionalAssets, supportedAssets } from '../shared/models'
import { IAssetResponse, IResponseConfig } from '../shared/types'
import { multiply, roundFloat } from '../shared/utils'

const textMatch = (part: string, str: string) => str.search(part) !== -1;

//@ TODO create Interfaces for array types:
const mergeByCurrency = (matchArray: any[], nextArray: any[]) =>
  matchArray.map(m => Object.assign({}, m, nextArray.find(n => n.currency === m.currency)));

// Return coins that match text | search by currency symbol or name.
export const findAsset = (txt: string, assets: any[]) => {
  const checkText = (k: string, a: any) => (textMatch(txt.toLowerCase(), a[k].toLowerCase()) ? a : null);
  const curriedCheckText = R.curry(checkText);
  const byName = R.map(curriedCheckText('name'), assets);
  const bySymbol = R.map(curriedCheckText('currency'), assets);
  const matchNames = R.reject(R.isNil, byName);
  const matchSymbols = R.reject(R.isNil, bySymbol);
  const combinedSearch = (matchNames.concat(matchSymbols));
  return R.uniq(combinedSearch);
};

export const filterAssets = (assets: IAssetResponse[]) => {
  const mergedAssets = mergeByCurrency(supportedAssets, assets);
  return mergedAssets.filter(asset => asset.name ? asset : null);
};

const pluckValuableAssets = (assets: IAssetResponse[]) => {
  const cleanedAssets = assets.filter((asset) => {
    if (asset.availableSupply) return asset;
    if (asset.price) return asset;
  });
  return cleanedAssets;
}

//@ TODO create Interfaces for portfolio types:
export const sortByValue = (portfolio: any) => portfolio.sort((a: any, b: any) => b.value - a.value);

const keysToClean = [
  'close',
  'dayOpen',
  'dayOpenVolume',
  'dayVolume',
  'high',
  'highExchange',
  'highQuoteCurrency',
  'highTimestamp',
  'maxSupply',
  'monthOpen',
  'monthOpenVolume',
  'monthVolume',
  'weekOpen',
  'weekOpenVolume',
  'weekVolume',
  'yearOpen',
  'yearOpenVolume',
  'yearVolume'
];

// Clean assets by removing unneeded keys.
export const cleanAssets = (assets: any) =>
  // Return our mapped assets array.
  assets.map((asset: any) =>
    // Iterate through each key in the object and create a new object (reduce).
    Object.keys(asset).reduce((newObj, key) => (
      // Check to see if this key is inside keysToClean.
      keysToClean.indexOf(key) < 0
      // If not, add it to the new object.
        ? ({ ...newObj, [key]: asset[key] })
        // Otherwise, ignore the key and move on
        // so that its not in our new object anymore.
        : newObj
    ), {}));

// Filter assets by supportedAssets then merge asset arrays.
// Remove assets without price & availableSupply.
// Multiply price * availableSupply to add marketCap, then add additionalAssets.
// Finally return assets sorted by marketCap.
export const formatAssets = (responses: IResponseConfig[]) => {
  let prices: any;
  let availableSupplies: any;

  responses.forEach((response: IResponseConfig) => {
    const { config } = response;
    const { url } = config;
    if (url.includes('prices')) {
      prices = response.data;
    } else if (url.includes('dashboard')) {
      availableSupplies = cleanAssets(response.data);
    }
    return {
      prices,
      availableSupplies
    };
  });

  const assetsPrices = filterAssets(prices);
  const assetsAvailableSupply = filterAssets(availableSupplies);
  const mergedAssets = mergeByCurrency(assetsPrices, assetsAvailableSupply);
  const assetsWithValue = pluckValuableAssets(mergedAssets);

  const assetsWithMarketCap = assetsWithValue.map((asset) => {
    const multipliedCap = multiply(Number(asset.price), Number(asset.availableSupply));
    const roundedCap = roundFloat(multipliedCap, 2);
    const marketCap = roundedCap ? Number(roundedCap) : 0;
    return {
      marketCap,
      ...asset
    };
  });

  const sortedAssets = assetsWithMarketCap.sort((a, b) => b.marketCap - a.marketCap);

  additionalAssets.map((asset: any) => sortedAssets.push(asset));

  return sortedAssets;
};
