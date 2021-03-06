import { getPrices, getAvailableSupply, getMarkets } from '../services/api';
import { formatAssets } from '../services/coinFactory';
import { IMarketAsset } from '../shared/types'
// import { multiply, roundFloat } from '../../utils';

// Action types
export const Actions = {
  GET_ALL_ASSETS: 'GET_ALL_ASSETS',
  GET_MARKET_PRICES: 'GET_MARKET_PRICES',
  SET_MARKET_PRICES: 'SET_MARKET_PRICES',
  ADD_COIN_PORTFOLIO: 'ADD_COIN_PORTFOLIO',
  ADD_COINS_PORTFOLIO: 'ADD_COINS_PORTFOLIO',
  UPDATE_COIN_PORTFOLIO: 'UPDATE_COIN_PORTFOLIO',
  REMOVE_COIN_PORTFOLIO: 'REMOVE_COIN_PORTFOLIO'
};

// Action creators
const actionGetAllAssets = (data: any) => ({
  type: Actions.GET_ALL_ASSETS,
  assets: data
});

const actionGetMarketPrices = ({
  type: Actions.GET_MARKET_PRICES,
  fetchingMarkets: true
});

const actionSetMarketPrices = (data: any) => ({
  type: Actions.SET_MARKET_PRICES,
  exchanges: data,
  fetchingMarkets: false
});

// const addCoinPortfolio = coin => ({
//   type: Actions.ADD_COIN_PORTFOLIO,
//   coin
// });

// const addCoinsPortfolio = coins => ({
//   type: Actions.ADD_COINS_PORTFOLIO,
//   coins
// });

// const updateCoinInPortfolio = coin => ({
//   type: Actions.UPDATE_COIN_PORTFOLIO,
//   coin
// });

// const removeCoinInPortfolio = coin => ({
//   type: Actions.REMOVE_COIN_PORTFOLIO,
//   coin
// });

const fetchAll = (array: any[]) => Promise.all(array);

// Actions
// Fetch assets from Nomics API V1.
export const fetchAllAssets = () => (dispatch: any) =>
  fetchAll([getPrices(), getAvailableSupply()]).then((responses) =>
    dispatch(actionGetAllAssets(formatAssets(responses))));

// Fetch USD, USDC & USDT markets to filter out Exchange List.
export const fetchMarketPrices = (asset: string) => (dispatch: any) => {
  dispatch(actionGetMarketPrices);
  return getMarkets().then((res) => {
    const { marketUSD, marketUSDC, marketUSDT } = res;
    const combinedExchanges = marketUSD.concat(marketUSDC).concat(marketUSDT);
    const exchangesForAsset = combinedExchanges.filter((marketAsset: IMarketAsset) =>
      marketAsset.base === asset);
    return dispatch(actionSetMarketPrices(exchangesForAsset));
  });
}

// Fetch the coins form localStorage.
// export const addCoins = coins => dispatch => getPrices().then((res) => {
//   const portfolioAssets = coins.map((coin) => {
//     const updatedCoin = res.data.filter(asset => coin.currency === asset.currency).pop();
//     const updatedCoinPrice = updatedCoin ? updatedCoin.price : '1';
//     return {
//       price: updatedCoinPrice,
//       availableSupply: coin.availableSupply,
//       balance: coin.balance,
//       currency: coin.currency,
//       marketCap: multiply(coin.availableSupply, updatedCoinPrice),
//       name: coin.name,
//       percentage: coin.percentage,
//       value: roundFloat(multiply(coin.balance, updatedCoinPrice), 2)
//     };
//   });

//   dispatch(addCoinsPortfolio(portfolioAssets));
// });

// Add a coin to your portfolio.
// export const addCoin = coin => (dispatch) => {
//   dispatch(addCoinPortfolio(coin));
// };

// Remove coin from your portfolio.
// export const removeCoin = coin => (dispatch) => {
//   dispatch(removeCoinInPortfolio(coin));
// };

// Update a coin in your portfolio.
// export const updateCoin = coin => (dispatch) => {
//   dispatch(updateCoinInPortfolio(coin));
// };
