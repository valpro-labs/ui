import * as React from 'react';

import { View } from 'react-native';

import { Text } from '@/components/ui/text';

type NightMarketBrandMarkProps = {
  label: string;
};

function NightMarketBrandMark({ label }: NightMarketBrandMarkProps) {
  const normalizedLabel = label.trim().toUpperCase();
  const accentLabel = normalizedLabel.slice(0, 3);
  const remainingLabel = normalizedLabel.slice(3);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{
          color: 'rgb(255, 70, 85)',
          fontSize: 27,
          lineHeight: 31,
          fontWeight: '900',
          letterSpacing: 1.2,
        }}>
        {accentLabel}
      </Text>
      {remainingLabel ? (
        <Text
          style={{
            color: 'rgb(237, 233, 226)',
            fontSize: 27,
            lineHeight: 31,
            fontWeight: '900',
            letterSpacing: 1.2,
          }}>
          {remainingLabel}
        </Text>
      ) : null}
    </View>
  );
}

export { NightMarketBrandMark };
