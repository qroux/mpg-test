import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Player } from '../../types/CustomTypes';

type PlayerProps = { player: Player; navigation: any };

export class PlayerRow extends React.PureComponent<PlayerProps> {
  render() {
    const { player, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Show', { player: player });
        }}>
        <ListItem key={player.id} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>
              {player.firstName} {player.lastName}
            </ListItem.Title>
            {/* <ListItem.Subtitle> </ListItem.Subtitle> */}
          </ListItem.Content>
          {/* @ts-ignore https://github.com/react-native-elements/react-native-elements/issues/3231*/}
          <ListItem.Chevron />
        </ListItem>
      </TouchableOpacity>
    );
  }
}
