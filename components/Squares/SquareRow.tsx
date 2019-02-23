import React from 'react'

import { CoinRow } from '../../styles'
import { numberWithCommas, round } from '../../shared/utils/math'

interface IProps {
  type: string;
  data: number | string;
}

export const SquareRow = (props: IProps) => {
  const { type, data } = props;
  const isPrice = type === 'Price:';
  const priceUSD = Number(data) > 1 ? round(Number(data)) : data;
  const isLargeNumber = type === 'Marketcap:' || type === 'Value:';
  const isExchangeRow = type === 'Exchange:';
  const isPosition = type === 'Position:';
  const isAllocation = type === 'Allocation:';
  const largeNumber = (num: number) => <p>${numberWithCommas(num)}</p>;

  return (
    <CoinRow>
      <p><em>{type}</em></p>
      {isPrice && <p>${priceUSD}</p>}
      {isLargeNumber && largeNumber(Number(data))}
      {isExchangeRow && <p>{data}</p>}
      {isPosition && <p>{data}</p>}
      {isAllocation && <p>{data}%</p>}
    </CoinRow>
  )
}
