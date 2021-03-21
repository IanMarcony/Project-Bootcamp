import styled, { css } from 'styled-components';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { TextInput as TextInputRN, View } from 'react-native';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled(View)<ContainerProps>`
  width: 100%;
  height: 60px;
  flex-direction: row;
  padding: 0 16px;
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  align-items: center;

  border-width: 2px;
  border-color: #232129;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff9000;
    `}
`;
export const TextInput = styled(TextInputRN)`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
