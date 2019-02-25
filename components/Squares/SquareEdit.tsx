import React from 'react'
import { connect } from 'react-redux'
import { bind } from 'decko'

import { SquareRow } from '../../components'
// import { addCoin, updateCoin, removeCoin } from '../../actions/coins';
import { IAsset } from '../../shared/types'
import { styleModifier, setStyle, numberWithCommas, round, rounder } from '../../shared/utils'
import { EditSquare, EditSquareData, EditButtonsContainer } from '../../styles'

interface IProps {
  coin: IAsset;
  portfolio: IAsset[];
  toggle(toggle: boolean, coin?: IAsset): void;
}

interface IState {
  coin: IAsset;
  price: number;
  balance: number;
  value: number;
  inPortfolio: boolean;
}

class SquareEdit extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    const { coin } = this.props;
    const { price } = coin;
    const value = coin.position !== undefined ? round(coin.position * price) : 0;

    this.state = {
      coin,
      price,
      balance: 0,
      value,
      inPortfolio: false
    };
  }

  componentWillMount() {
    const { coin, portfolio } = this.props;
    const { balance: stateBalance } = this.state;

    const inPortfolio = portfolio && portfolio.filter(c => c.currency === coin.currency);
    const portCoin = inPortfolio[0] ? inPortfolio[0] : coin;
    const balance = portCoin.position ? portCoin.position : stateBalance;

    this.setState({
      coin: portCoin,
      balance,
      inPortfolio: inPortfolio.length > 0
    });
  }

  render() {
    const { coin, balance, value, inPortfolio } = this.state;
    const { currency, exchange, percentage, position, price } = coin;

    const SaveButton = () => <button onClick={this.handleSave} disabled={balance <= 0}>Save</button>;
    const RemoveButton = () => <button onClick={this.handleRemove}>Remove</button>;
    const CancelButton = () => <button onClick={() => this.props.toggle(false)}>Cancel</button>;

    return (
      <EditSquare className={styleModifier(currency)} style={setStyle(currency)}>
        <header>
          <h2>{currency}</h2>
          <h3 style={setStyle(currency)}>Edit your position below</h3>
        </header>
        <input
          type="number"
          placeholder="0"
          value={this.state.balance}
          onFocus={this.handleFocus}
          onChange={this.handleChange}
        />
        <EditSquareData>
          <SquareRow type={'Price:'} data={price}/>
          <SquareRow type={'Exchange:'} data={exchange}/>
          <SquareRow type={'Position:'} data={position}/>
          <SquareRow type={'Allocation:'} data={percentage}/>
          <SquareRow type={'Value:'} data={value}/>
        </EditSquareData>
        <EditButtonsContainer>
          <SaveButton/>
          {inPortfolio && <RemoveButton/>}
          <CancelButton/>
        </EditButtonsContainer>
      </EditSquare>
    );
  }

  @bind
  private handleFocus(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    target.select();
  }

  @bind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const target = event.target as HTMLInputElement;
    const balance = Number(target.value);
    const value = rounder(balance, this.state.price);

    this.setState({
      balance,
      value
    });
  }

  @bind
  private addCoin(coin: IAsset, balance: number) {
    const { value } = this.state;
    console.log('addCoin');
    // this.props.addCoin(Object.assign({
    //   balance,
    //   value
    // }, coin));
  }

  @bind
  private updateCoin(coin: IAsset, balance: number) {
    const { value } = this.state;
    const updatedCoin = Object.assign(coin);
    updatedCoin.balance = balance;
    updatedCoin.value = value;
    console.log('updateCoin');
    // this.props.updateCoin(updatedCoin);
  }

  @bind
  private handleSave() {
    const { coin, balance, inPortfolio } = this.state;
    console.log('handleSave');
    // inPortfolio ? this.updateCoin(coin, balance) : this.addCoin(coin, balance);
    // this.props.toggle(false);
  }

  @bind handleRemove() {
    const { coin } = this.state;
    console.log('handleRemove', coin);
    // this.props.removeCoin(coin);
    // this.props.toggle(false);
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  // addCoin: (...args) => dispatch(addCoin(...args)),
  // updateCoin: (...args) => dispatch(updateCoin(...args)),
  // removeCoin: (...args) => dispatch(removeCoin(...args))
});

// const mapStateToProps = (state: IInitState) => ({
//   portfolio: AssetsReducer.portfolio
// });

export const SquareEditJest = SquareEdit;

export default connect(null, mapDispatchToProps)(SquareEdit);
