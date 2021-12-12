import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, RootTabParamList } from '../../types';
import { Club, Player } from '../../types/CustomTypes';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

type PlayerProps = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, 'Index'>,
    NativeStackNavigationProp<RootStackParamList, 'Index'>
  >;
  player: Player;
  club: Club;
  rating: number | string;
};

export class PlayerRow extends React.PureComponent<PlayerProps> {
  render() {
    const { navigation, player, club, rating } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Show', { player, club, rating });
        }}>
        <ListItem key={player.id} bottomDivider>
          <Avatar source={{ uri: club.defaultJerseyUrl }} />
          <ListItem.Content>
            <ListItem.Title>
              {player.firstName} {player.lastName}
            </ListItem.Title>
            <ListItem.Subtitle>
              {club.name['fr-FR']} - Note: {rating}
            </ListItem.Subtitle>
          </ListItem.Content>
          {/* @ts-ignore https://github.com/react-native-elements/react-native-elements/issues/3231 */}
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }
}
