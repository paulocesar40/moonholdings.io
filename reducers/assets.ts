import { Actions } from '../actions/assets'
import { IinitialAssetsState as IInitState, IAsset, IMarketAsset } from '../shared/types'
import { calculatePercentage } from '../services/coinFactory'
import { arrayToObject } from '../shared/utils'

export const defaultAssetsState: IInitState = {
  assets: [],
  portfolio: [],
  watchlist: [],
  exchanges: [],
  loading: true,
  fetchingMarkets: false
};

interface IAction {
  type: string;
  coin: IAsset;
  assets: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  fetchingMarkets: boolean;
}

export const AssetsReducer = (state = defaultAssetsState, action: IAction): IInitState => {
  switch (action.type) {
    case Actions.GET_ALL_ASSETS: {
      const { loading } = action;
      return { ...state, loading };
    }

    case Actions.SET_ALL_ASSETS: {
      const { assets, loading } = action;
      return { ...state, assets, loading };
    }

    case Actions.GET_MARKET_PRICES: {
      const { fetchingMarkets } = action;
      return { ...state, fetchingMarkets };
    }

    case Actions.SET_MARKET_PRICES: {
      const { exchanges, fetchingMarkets } = action;
      return { ...state, exchanges, fetchingMarkets };
    }

    case Actions.ADD_COINS_PORTFOLIO:
      const { assets } = action;
      return { ...state, portfolio: assets };

    case Actions.ADD_COIN_PORTFOLIO:
      const { coin } = action;
      const { portfolio } = state;
      const newPortfolio = calculatePercentage(portfolio, coin);
      const moonPortfolio = arrayToObject(newPortfolio);
      localStorage.setItem('moon_portfolio', JSON.stringify(moonPortfolio));

      return { ...state, portfolio: newPortfolio };

    // case Actions.REMOVE_COIN_PORTFOLIO:
    //   const filteredPortfolio = state.portfolio.filter(c => c !== action.coin);
    //   let lighterPortfolio;

    //   if (filteredPortfolio.length > 0) {
    //     lighterPortfolio = calculatePercentage(filteredPortfolio);
    //     localStorage.setItem('moonPortfolio', JSON.stringify(lighterPortfolio));
    //   } else {
    //     lighterPortfolio = [];
    //     localStorage.clear();
    //   }

    //   return {
    //     ...state,
    //     portfolio: lighterPortfolio
    //   };

    // case Actions.UPDATE_COIN_PORTFOLIO:
    //   const found = state.portfolio.find(c => c.currency === action.coin.currency);

    //   const mappedPortfolio = state.portfolio.map((c) => {
    //     if (c.currency === found.currency) {
    //       return Object.assign({}, found);
    //     }

    //     return c;
    //   });

    //   const updatedPortfolio = calculatePercentage(mappedPortfolio);

    //   localStorage.setItem('moonPortfolio', JSON.stringify(updatedPortfolio));

    //   return {
    //     ...state,
    //     portfolio: calculatePercentage(updatedPortfolio)
    //   };

    default:
      return state;
  }
};
