import styled from 'styled-components';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

import { View, Text, TouchableOpacity } from 'react-native';

export const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 160 : 40}px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToSignInButton = styled(TouchableOpacity)`
  margin-top: 24px;
  flex-direction: row;
  background-color: #312e38;
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;

  padding: 16px 0 ${16 + getBottomSpace()}px;

  border-top-width: 1px;
  border-top-color: #232129;

  justify-content: center;
  align-items: center;
`;

export const BackToSignInButtonText = styled(Text)`
  color: #fff;
  font-size: 15px;
  margin-left: 16px;
  font-family: 'RobotoSlab-Regular';
`;
