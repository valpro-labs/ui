import * as React from 'react';

import { View } from 'react-native';

import { Text } from '@/components/ui/text';

type NightMarketBrandMarkProps = {
  label: string;
  size?: number;
};

function NightMarketBrandMark({ label, size = 27 }: NightMarketBrandMarkProps) {
  const normalizedLabel = label.trim().toUpperCase();
  const accentLabel = normalizedLabel.slice(0, 3);
  const remainingLabel = normalizedLabel.slice(3);
  const lineHeight = size + 4;
  const letterSpacing = size >= 40 ? 2 : 1.2;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text
        style={{
          color: 'rgb(255, 70, 85)',
          fontSize: size,
          lineHeight,
          fontWeight: '900',
          letterSpacing,
        }}>
        {accentLabel}
      </Text>
      {remainingLabel ? (
        <Text
          style={{
            color: 'rgb(237, 233, 226)',
            fontSize: size,
            lineHeight,
            fontWeight: '900',
            letterSpacing,
          }}>
          {remainingLabel}
        </Text>
      ) : null}
    </View>
  );
}

export { NightMarketBrandMark };
export type { NightMarketBrandMarkProps };
