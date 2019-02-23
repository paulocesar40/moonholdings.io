import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import {
  Welcome, Astronaut, NomicsLink, PlusButton, Portfolio,
  SquareEditWrapper, Search, BlockLoader, Overlay
}  from '../../components'
import { IinitialState, IMarketAsset, IAsset } from '../../shared/types'
import { coinModel } from '../../shared/models'
import { StyledBoard } from '../../styles'
import { addCoinsPortfolio, fetchAllAssets } from '../../actions/assets'
import { setOverlayState } from '../../actions/board'

interface IState {
  coin: IAsset;
  edit: boolean;
  search: boolean;
}

interface IProps {
  assets: IAsset[];
  portfolio: IAsset[];
  exchanges: IMarketAsset[];
  loading: boolean;
  overlay: boolean;
  fetchingMarkets: boolean;
  addCoinsPortfolio(assets: IAsset[] | {}[]): void;
  fetchAllAssets(): void;
  setOverlayState(overlay: boolean): void;
}

class Board extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      coin: coinModel,
      edit: false,
      search: false
    };
  }

  componentDidMount() {
    const { localStorage } = window;
    const { portfolio } = this.props;

    this.props.fetchAllAssets();

    if (portfolio.length === 0) {
      const storedPortfolio = JSON.parse(localStorage.getItem('moon_portfolio') || '{}');

      if (storedPortfolio) {
        console.log('storedPortfolio', storedPortfolio);
        const reconstructedPortfolio = Object.values(storedPortfolio);
        this.props.addCoinsPortfolio(reconstructedPortfolio);
      }
    }
  }

  render() {
    const { assets, portfolio, loading, overlay, exchanges, fetchingMarkets } = this.props;
    const { coin, edit, search } = this.state;
    const hasPortfolio = portfolio.length > 0;

    return (
      <div>
        { edit &&
          <SquareEditWrapper
            coin={coin}
            portfolio={portfolio}
            toggle={this.toggleSquareEdit}
          /> }
        { search &&
          <Search
            assets={assets}
            exchanges={exchanges}
            cancel={this.handleOverlayClick}
            fetching={fetchingMarkets}
          /> }
        { overlay && <Overlay handleClick={this.handleOverlayClick} /> }
        <StyledBoard>
          { loading ? <BlockLoader /> : !hasPortfolio ? <Welcome />
            : <Portfolio coins={portfolio} edit={this.toggleSquareEdit} />
          }
          <PlusButton toggleSearch={this.handleOnSearch} />
          <NomicsLink />
          <Astronaut showLogo={hasPortfolio} />
        </StyledBoard>
      </div>
    );
  }

  @bind
  private handleOnSearch() {
    this.setState({ search: true });
    this.props.setOverlayState(true);
  }

  @bind
  private toggleSquareEdit(toggle: boolean, coin?: IAsset) {
    coin ?
      this.setState({ coin, edit: toggle }) :
      this.setState({ edit: toggle });
 
    this.props.setOverlayState(toggle);
  }

  @bind
  private handleOverlayClick() {
    const { edit, search } = this.state;
    if (edit) this.toggleSquareEdit(false, coinModel);
    if (search) this.setState({ search: false });
    this.props.setOverlayState(false);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchAllAssets: () => dispatch(fetchAllAssets()),
  addCoinsPortfolio: (assets: IAsset[]) => dispatch(addCoinsPortfolio(assets)),
  setOverlayState: (overlay: boolean) => dispatch(setOverlayState(overlay))
});

const mapStateToProps = (state: IinitialState) => ({
  assets: state.AssetsReducer.assets,
  portfolio: state.AssetsReducer.portfolio,
  exchanges: state.AssetsReducer.exchanges,
  loading: state.AssetsReducer.loading,
  fetchingMarkets: state.AssetsReducer.fetchingMarkets,
  overlay: state.BoardReducer.overlay
});

export const BoardJest = Board;

export default connect(mapStateToProps, mapDispatchToProps)(Board);
