import { Pressable, Text, StyleSheet } from 'react-native';
import type { PressableProps } from 'react-native';

export interface ButtonProps extends PressableProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      style={[styles.base, styles[variant], styles[size], style as any]}
      {...props}
    >
      <Text
        style={[
          styles.text,
          variant === 'outline' && styles.outlineText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  primary: {
    backgroundColor: '#FF4655',
  },
  secondary: {
    backgroundColor: '#1F2326',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FF4655',
  },
  sm: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  md: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  lg: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  outlineText: {
    color: '#FF4655',
  },
});
