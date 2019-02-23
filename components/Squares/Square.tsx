import React from 'react'

import { SquareRow } from '../../components'
import { IAsset } from '../../shared/types'
import { SquareShade, SquareInSearch, SquareShadeInSearch, CoinSquare, CoinRank }
  from '../../styles'
import { setStyle, styleModifier } from '../../shared/utils/modifiers'

interface IProps {
  coin: IAsset;
  index: number;
  inSearch?: boolean;
  edit(toggle: boolean, coin: IAsset): void;
}

export default class Square extends React.PureComponent<IProps> {
  public render() {
    const { coin, edit, index, inSearch } = this.props;
    const { currency, exchange, position, percentage, price, marketCap, value } = coin;
    // Update shade style based on in Board or in Search
    const SquareStyle = !inSearch ? CoinSquare : SquareInSearch;
    const Shade = !inSearch ? SquareShade : SquareShadeInSearch;

    return (
      <div
        className={styleModifier(coin.currency)}
        style={setStyle(coin.currency)}
        onClick={() => edit(true, coin)}
      >
        <SquareStyle className="coin-square">
          <Shade>
            <CoinRank>
              <span><h1>{currency}</h1></span>
              { !inSearch && <span><h4>#{index + 1}</h4></span> }
            </CoinRank>
            { price && <SquareRow type={'Price:'} data={price}/> }
            { inSearch && <SquareRow type={'Marketcap:'} data={marketCap}/> }
            { exchange && <SquareRow type={'Exchange:'} data={exchange}/> }
            { position && <SquareRow type={'Position:'} data={position}/> }
            { percentage && <SquareRow type={'Allocation:'} data={percentage}/> }
            { value && <SquareRow type={'Value:'} data={value}/> }
          </Shade>
        </SquareStyle>
      </div>
    );
  }
}
