import React from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Svg, { Circle } from 'react-native-svg';

import Container from '../Core/Container';
import Currency from '../Core/Currency';
import EntrySummaryChart from '../EntrySummaryChart';
import useBalanceSumByCategory from '../../hooks/useBalanceSumByCategory';
import { colors } from '../../styles/colors';

import { EntrySummaryList, ChartContainer } from './styles';
import { IProps } from './types';

const EntrySummary: React.FC<IProps> = ({ days = 7, onPressActionButton }) => {
  const { balanceSum } = useBalanceSumByCategory(days);

  return (
    <Container
      title="Categorias"
      actionLabelText={`Últimos ${days} dias`}
      actionButtonText="Ver mais"
      onPressActionButton={onPressActionButton}
    >
      <ChartContainer>
        <EntrySummaryChart data={balanceSum} />
        <EntrySummaryList>
          <FlatList
            data={balanceSum}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item: entry }) => (
              <View
                style={{
                  flexDirection: 'row',
                  marginVertical: 2,
                  marginRight: 1,
                }}
              >
                <Svg height="20" width="22">
                  <Circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke={colors.background}
                    strokeWidth="0.5"
                    fill={entry.category.color || colors.white}
                  />
                </Svg>
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.white,
                    marginTop: 2,
                  }}
                >
                  {entry.category.name}
                </Text>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 12,
                    color: colors.white,
                    marginTop: 2,
                    textAlign: 'right',
                  }}
                >
                  <Currency value={entry.amount.toString()} />
                </Text>
                <Text />
              </View>
            )}
          />
        </EntrySummaryList>
      </ChartContainer>
    </Container>
  );
};

export default EntrySummary;
