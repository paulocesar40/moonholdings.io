import { getPrices, getAvailableSupply, getMarkets } from '../services/api'
import { fetchAll, combineExchangeData, formatAssets, formatCoinsForPortfolio }
  from '../services/coinFactory'
import { IAsset, DispatchAllAssets, DispatchMarketPrices, DispatchAddCoin, DispatchAddCoins }
  from '../shared/types'

// ACTION TYPES
export const Actions = {
  GET_ALL_ASSETS: 'GET_ALL_ASSETS',
  SET_ALL_ASSETS: 'SET_ALL_ASSETS',
  GET_MARKET_PRICES: 'GET_MARKET_PRICES',
  SET_MARKET_PRICES: 'SET_MARKET_PRICES',
  ADD_COIN_PORTFOLIO: 'ADD_COIN_PORTFOLIO',
  ADD_COINS_PORTFOLIO: 'ADD_COINS_PORTFOLIO',
  UPDATE_COIN_PORTFOLIO: 'UPDATE_COIN_PORTFOLIO',
  REMOVE_COIN_PORTFOLIO: 'REMOVE_COIN_PORTFOLIO',
  ADD_COIN_WATCHLIST: 'ADD_COIN_WATCHLIST',
  REMOVE_COIN_WATCHLIST: 'REMOVE_COIN_WATCHLIST',
};

// ACTION CREATORS
const actionGetAllAssets = () => ({
  type: Actions.GET_ALL_ASSETS,
  loading: true
});

const actionSetAllAssets = (data: any) => ({
  type: Actions.SET_ALL_ASSETS,
  assets: data,
  loading: false
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

const actionAddCoinPortfolio = (coin: IAsset) => ({
  type: Actions.ADD_COIN_PORTFOLIO,
  coin
});

const actionAddCoinsPortfolio = (coins: IAsset[]) => ({
  type: Actions.ADD_COINS_PORTFOLIO,
  assets: coins
});

// const updateCoinInPortfolio = coin => ({
//   type: Actions.UPDATE_COIN_PORTFOLIO,
//   coin
// });

// const removeCoinInPortfolio = coin => ({
//   type: Actions.REMOVE_COIN_PORTFOLIO,
//   coin
// });

const actionAddCoinWatchlist = (coin: IAsset) => ({
  type: Actions.ADD_COIN_WATCHLIST,
  coin
});

// ACTIONS
// Fetch assets from Nomics API V1.
export const fetchAllAssets = () => (dispatch: DispatchAllAssets) => {
  dispatch(actionGetAllAssets());
  return fetchAll([getPrices(), getAvailableSupply()]).then((responses) =>
    dispatch(actionSetAllAssets(formatAssets(responses))));
}

// Fetch USD, USDC & USDT markets to filter out Exchange List.
export const fetchMarketPrices = (asset: string) => (dispatch: DispatchMarketPrices) => {
  dispatch(actionGetMarketPrices);
  return getMarkets().then((res) => {
    if (res && res.marketUSD && res.marketUSDC && res.marketUSDT) {
      const exchangesForAsset = combineExchangeData(asset, res);
      return dispatch(actionSetMarketPrices(exchangesForAsset));
    }
    else {
      return dispatch(actionSetMarketPrices([]));
    }
  });
}

// Fetch the coins form localStorage.
export const addCoinsPortfolio = (coins: IAsset[]) => (dispatch: DispatchAddCoins) => {
  console.log('addCoinsPortfolio', coins);
  return getPrices().then((res) => {
    if (res) {
      const portfolioAssets = formatCoinsForPortfolio(coins, res.data);
      dispatch(actionAddCoinsPortfolio(portfolioAssets));
    }
  });
}
  

// Add a coin to your portfolio.
export const addCoinPortfolio = (coin: IAsset) => (dispatch: DispatchAddCoin) => {
  dispatch(actionAddCoinPortfolio(coin));
};

// Remove coin from your portfolio.
// export const removeCoin = coin => (dispatch) => {
//   dispatch(removeCoinInPortfolio(coin));
// };

// Update a coin in your portfolio.
// export const updateCoin = coin => (dispatch) => {
//   dispatch(updateCoinInPortfolio(coin));
// };
