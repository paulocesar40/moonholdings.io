import styled from 'styled-components'

export const SquareShade = styled.section`
  position: relative;
  top: -22px;
  left: -22px;
  padding: 10px;
  width: 192px;
  height: 192px;
  border-top: 1px solid rgba(256, 256, 256, .125);
  border-right: 1px solid rgba(256, 256, 256, .125);
  border-bottom: 1px solid rgba(0, 0, 0, .125);
  border-left: 1px solid rgba(0, 0, 0, .125);
`;

export const CoinSquare = styled.section`
  display: inline-block;
  flex-grow: 1;
  box-sizing: content-box;
  position: relative;
  align-self: auto;
  padding: 20px 20px 0;
  max-width: 170px;
  min-width: 170px;
  max-height: 190px;
  min-height: 190px;
  font-size: em(14);
  background: $lightGray;
  border: 2px solid rgba(87, 56, 92, 0);
  box-shadow: 1px 1px 0 rgba(47, 38, 90, 0.2),
              2px 2px 2px rgba(47, 38, 90, 0.1);
  cursor: pointer;

  &:hover {
    transition: all 200ms ease-in-out;
    border: 2px solid ${props => props.theme.offWhite};
    opacity: 0.8;
  }

  em { font-style: normal; opacity: 0.7 }
  p { font-weight: 200; }
`;

export const SquareInSearch = styled(CoinSquare)`
  max-width: 200px;
  min-width: 200px;
  max-height: 207px;
  min-height: 207px;
`;

export const SquareShadeInSearch = styled(SquareShade)`
  width: 221px;
  height: 210px;
`

export const EditSquareWrapper = styled.section`
  display: flex;
  position: absolute;
  width: 100%;
  justify-content: center;
  align-items: center;
`

export const EditSquare = styled(CoinSquare)`
  z-index: 12;
  display: block;
  left: 0;
  margin-top: 200px;
  padding: 2rem;
  max-width: 500px;
  min-width: 500px;
  max-height: 500px;
  min-height: 500px;
  font-size: 1.5rem;
  cursor: default;

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    h2 { margin: 0; font-size: 4rem; }
    h3 { margin: 2rem 0; }
  }

  input {
    margin: -1rem 0 0.5rem;
    padding-left: 1rem;
    width: 96%;
    height: 3.5rem;
    font-size: 1.5rem;
    background: none;
    border: 1px solid ${props => props.theme.offWhite};
    outline-width: 0;
  }

  &:hover {
    border: 2px solid rgba(87, 56, 92, 0);
    opacity: 1;
  }
`

export const EditSquareData = styled.section`
  height: 100%;
  p { margin: 1rem 0 !important; line-height: 1rem; }
`;

export const EditButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  bottom: 2rem;

  button {
    margin-top: 1rem;
    width: 50%;
    height: 4rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
`;

export const CoinRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 4px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  h1 { font-size: 1.5rem; line-height: 0; }
  h4 { line-height: 0.15rem; }
  p { margin: 0; }
`;

export const CoinRank = styled(CoinRow)`
  margin-bottom: 0.5rem;
  border-bottom: none;
`;
