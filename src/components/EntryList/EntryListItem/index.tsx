import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from '../../../styles/colors';
import Currency from '../../Core/Currency';
import moment from '../../../vendors/moment';

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
    <TouchableOpacity onPress={() => onEntryPress && onEntryPress(entry)}>
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
            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Icon
                style={{
                  color: colors.metal,
                  marginTop: 2,
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
                {moment(entry.entryAt).calendar()}
              </Text>
            </View>
            {entry.address && (
              <View
                style={{
                  flexDirection: 'row',
                }}
              >
                <Icon
                  style={{
                    color: colors.metal,
                    marginTop: 2,
                    marginRight: 2,
                    marginLeft: 6,
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
                  {`${entry.address.substr(0, 18)}...`}
                </Text>
              </View>
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
            <Currency value={entry.amount.toString()} />
          </Text>
        </AmountView>
      </Container>
    </TouchableOpacity>
  );
};

export default EntryListItem;
