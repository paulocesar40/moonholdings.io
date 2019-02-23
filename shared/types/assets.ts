export interface IAsset {
  availableSupply?: string;
  currency: string;
  exchange: string;
  marketCap: number;
  name: string;
  percentage: number;
  price: number;
  position: number;
  value: number;
  inWatchlist?: boolean;
}

export interface IMarketAsset {
  exchange: string;
  base: string;
  quote: string;
  price_quote: string;
  timestamp: string;
}

export interface IinitialAssetsState {
  assets: IAsset[];
  portfolio: IAsset[];
  watchlist: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  fetchingMarkets: boolean;
}

export interface IinitalBoardState {
  overlay: boolean;
}

export interface IinitialState {
  AssetsReducer: IinitialAssetsState;
  BoardReducer: IinitalBoardState;
}

export interface IDisableCheck {
  type: string;
  position?: number;
  selected: IAsset | null;
  exchange: string;
  exchanges: IMarketAsset[];
}
