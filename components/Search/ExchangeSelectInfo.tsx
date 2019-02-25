import React from 'react'
import { IAsset, IMarketAsset } from '../../shared/types'
import { EnterPositionStyle } from '../../styles'

interface IPropsInfo {
  asset: IAsset;
}

interface IPropsCount {
  exchanges: IMarketAsset[];
}

interface IPropsPosition {
  asset: IAsset;
  enterPosition(event: React.FormEvent<HTMLInputElement>): void;
}

export const ExchangeSelectInfo = (props: IPropsInfo) =>
  <h2>Exchanges with <span>{props.asset.currency}</span> denominated in USD, USDC, or USDT will be listed above. Otherwise the asset may only be denominated in BTC or another cryptocurrency and it's price will be an aggregate of supported exchanges.</h2>;

export const ExchangesCount = (props: IPropsCount) => {
  const { exchanges } = props;
  const pural = exchanges.length > 1 && 's';
  return (<option key={'default'}>({exchanges.length}) Exchange{pural}:</option>);
}

export const EnterPosition = (props: IPropsPosition) => {
  const { asset, enterPosition } = props;
  return (
    <EnterPositionStyle>
      <h2>Enter your <span>{asset.currency}</span> position in order to add asset to your Portfolio. Or add the asset to your Watchlist.</h2>
      <input type="number" placeholder="Enter Position" onChange={enterPosition} />
      <h2>Position is how much of the Asset you own.</h2>
    </EnterPositionStyle>
  )
}
