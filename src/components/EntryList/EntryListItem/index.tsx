import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../styles/colors';

import { IProps } from './types';
import { Container, BulletView, DescriptionView, AmountView } from './styles';

const EntryListItem: React.FC<IProps> = ({
  entry,
  isFirstItem,
  isLastItem,
  onEntryPress,
}) => {
  const bulletLineY = isFirstItem ? 25 : 0;
  const bulletLineHeight = isLastItem ? 25 : 50;
  const showBulletLine = !(isFirstItem && isLastItem);
  const bulletColor = entry.category.color || colors.blue;

  return (
    <TouchableOpacity onPress={() => onEntryPress(entry)}>
      <Container>
        <BulletView>
          <Svg height="50" width="30">
            {showBulletLine && (
              <Rect
                x="9"
                y={bulletLineY}
                width="1.5"
                height={bulletLineHeight}
                fill={colors.background}
              />
            )}

            <Circle
              cx="10"
              cy="25"
              r="8"
              stroke={colors.background}
              strokeWidth="1.5"
              fill={bulletColor}
            />
          </Svg>
        </BulletView>

        <DescriptionView>
          <Text
            style={{
              fontSize: 14,
              color: colors.white,
            }}
          >
            {entry.description}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Icon
              style={{
                color: colors.metal,
                marginRight: 2,
              }}
              name="access-time"
              size={12}
            />
            <Text
              style={{
                fontSize: 12,
                color: colors.metal,
              }}
            >
              {entry.entryAt.toLocaleString()}
            </Text>
            {entry.address && (
              <>
                <Icon
                  style={{
                    color: colors.metal,
                    marginRight: 2,
                    marginLeft: 2,
                  }}
                  name="person-pin"
                  size={12}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.metal,
                  }}
                >
                  Localização
                </Text>
              </>
            )}
          </View>
        </DescriptionView>

        <AmountView>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: colors.white,
            }}
          >
            ${entry.amount}
          </Text>
        </AmountView>
      </Container>
    </TouchableOpacity>
  );
};

export default EntryListItem;
