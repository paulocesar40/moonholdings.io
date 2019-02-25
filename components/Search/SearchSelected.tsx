import React from 'react'

import { Square } from '../../components'
import { IAsset } from '../../shared/types'
import { SearchSelectAsset, SquareContainer } from '../../styles'

interface IProps {
  selected: IAsset
}

export const SearchSelected = (props: IProps) => {
  return (
    <SearchSelectAsset>
      <h2>No USD, USDC or USDT paired based exchanges found, using aggregate exchange data.</h2>
      <SquareContainer>
        <Square coin={props.selected} index={0} inSearch={true} edit={function(){}} />
      </SquareContainer>
    </SearchSelectAsset>
  )
}
