import styled from 'styled-components';
import FeatherIcon from 'react-native-vector-icons/Feather';

import { TextInput as TextInputRN, View } from 'react-native';

export const Container = styled(View)`
  width: 100%;
  height: 60px;
  flex-direction: row;
  padding: 0 16px;
  background-color: #232129;
  border-radius: 10px;
  margin-bottom: 8px;

  align-items: center;
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
