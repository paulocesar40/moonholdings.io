import React from 'react'

import { SquareEdit } from '../../components'
import { IAsset } from '../../shared/types'
import { EditSquareWrapper } from '../../styles'

interface IProps {
  coin: IAsset;
  portfolio: IAsset[];
  toggle(toggle: boolean, coin?: IAsset): void;
}

export const SquareEditWrapper = (props: IProps) => {
  const { coin, portfolio, toggle } = props;
  return (
    <EditSquareWrapper>
      <SquareEdit coin={coin} portfolio={portfolio} toggle={toggle} />
    </EditSquareWrapper>
  );
}
