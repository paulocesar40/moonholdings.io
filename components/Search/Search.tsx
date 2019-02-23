import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { SearchInput, SelectedAsset, SearchList, SearchSelect } from '../../components'
import { IAsset, IMarketAsset } from '../../shared/types'
import { SearchContainerDiv, SearchSection, SearchButtons, FunctionButton, CommonButton }
  from '../../styles'
import { setSearchBtnDisabled } from '../../shared/utils'
import { findAsset, getExchangePrice } from '../../services/coinFactory';
import { addCoinPortfolio, fetchMarketPrices } from '../../actions/assets'

interface IProps {
  assets: IAsset[];
  exchanges: IMarketAsset[];
  fetching: boolean;
  cancel(): void;
  addCoinPortfolio(coin: IAsset): void;
  fetchMarketPrices(asset: string): void;
}

interface IState {
  exchange: string;
  position: number;
  selected: IAsset | null;
  searchList: IAsset[];
  saved: IAsset[];
}

class Search extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      exchange: '',
      position: 0,
      selected: null,
      searchList: props.assets,
      saved: props.assets,
    }
  }

  componentDidUpdate() {
    const { assets } = this.props;
    const { saved } = this.state;

    if (saved.length === 0) {
      this.setState({
        searchList: assets,
        saved: assets
      });
    }
  }

  render() {
    const { assets, cancel, exchanges, fetching } = this.props;
    const { exchange, position, searchList, selected } = this.state;

    const portfolioCheck = { type: 'portfolio', position, selected, exchange, exchanges };
    const watchlistCheck = { type: 'watchlist', selected, exchange, exchanges };
    const disabledPortfolio = setSearchBtnDisabled(portfolioCheck);
    const disabledWatchlist = setSearchBtnDisabled(watchlistCheck);

    return (
      <SearchContainerDiv>
        <SearchSection>
          { selected
            ? <SelectedAsset asset={selected} clearSelected={this.handleClearSelected}/>
            : <SearchInput handleSearchTyping={this.handleSearchTyping}/> }
          { selected
            ? <SearchSelect
                assets={assets}
                selected={selected}
                exchange={exchange}
                exchanges={exchanges}
                fetching={fetching}
                enterPosition={this.handleEnterPosition}
                exchangeSelect={this.handleExchangeSelect}
              />
            : <SearchList
                searchList={searchList}
                onSelect={this.handleSelect}
              /> }
        </SearchSection>
        <SearchButtons>
          <FunctionButton
            disabled={disabledPortfolio}
            onClick={this.handleAddPortfolio}
          >
            Add to Portfolio
          </FunctionButton>
          <FunctionButton disabled={disabledWatchlist}>Add to Watchlist</FunctionButton>
          <CommonButton onClick={cancel}>Cancel Search</CommonButton>
        </SearchButtons>
      </SearchContainerDiv>
    );
  }

  @bind
  handleEnterPosition(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const { value } = target;
    this.setState({ position: Number(value) });
  }

  @bind
  handleAddPortfolio() {
    const { exchanges, cancel: closeSearchModal } = this.props;
    const { exchange, position, selected } = this.state;

    if (selected) {
      const { currency, marketCap, name, price: defaultPrice, } = selected;
      const price = exchange ? getExchangePrice(exchange, exchanges) : Number(defaultPrice);

      this.props.addCoinPortfolio(Object.assign({
        currency,
        exchange,
        name,
        marketCap,
        position,
        price,
        value: (price * position)
      }, selected));

      closeSearchModal();
    }
  }

  @bind
  handleExchangeSelect(event: React.FormEvent<HTMLSelectElement>) {
    const target = event.target as HTMLSelectElement;
    const exchange = target.value;
    this.setState({ exchange });
  }

  @bind
  handleClearSelected() {
    const { saved } = this.state;
    this.setState({
      searchList: saved,
      selected: null,
      exchange: ''
    });
  }

  @bind
  handleSearchTyping(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const { value: searchText } = target;

    const search = (text: string) => {
      const { searchList } = this.state;
      const searchedCoins = findAsset(text, searchList);
      this.setState({ searchList: searchedCoins });
    };

    const clearSearch = () => this.setState({ searchList: this.state.saved });

    const handleUpdate = (num: number) => (num > 1 ? search(searchText) : clearSearch());

    return handleUpdate(searchText.length);
  }

  @bind
  handleSelect(asset: IAsset) {
    this.props.fetchMarketPrices(asset.currency);
    this.setState({ selected: asset });
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchMarketPrices: (asset: string) => dispatch(fetchMarketPrices(asset)),
  addCoinPortfolio: (coin: IAsset) => dispatch(addCoinPortfolio(coin)),
});

export const SearchJest = Search;

export default connect(null, mapDispatchToProps)(Search);
