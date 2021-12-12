import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../../types';
import { Player } from '../../types/CustomTypes';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type PlayerProps = {
  player: Player;
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'Index'>,
    NativeStackNavigationProp<RootStackParamList, 'Index'>
  >;
};

export class PlayerRow extends React.PureComponent<PlayerProps> {
  render() {
    const { player, navigation } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Show', { player });
        }}>
        <ListItem key={player.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {player.firstName} {player.lastName}
            </ListItem.Title>
            {/* <ListItem.Subtitle> </ListItem.Subtitle> */}
          </ListItem.Content>
          {/* @ts-ignore https://github.com/react-native-elements/react-native-elements/issues/3231 */}
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }
}
