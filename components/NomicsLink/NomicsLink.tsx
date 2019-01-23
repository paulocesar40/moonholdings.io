import React from 'react';
import styled from 'styled-components';

import { nomicsLink } from '../../shared';

export const Link = styled.p`
  position: absolute;
  z-index: 10;
  bottom: 20px;
  right: 300px;
  width: 100%;
  font-size: 1.5rem;
  text-align: right;
  cursor: pointer;

  a {
    color: ${(props) => props.theme.apricot};
    cursor: pointer;

    :hover {
      color: ${(props) => props.theme.offWhite};
    }
  }
`;

export default class NomicsLink extends React.Component {
  render() {
    return (<Link>Powered by <a href={nomicsLink} target="blank">Nomics APIs.</a></Link>)
  }
}