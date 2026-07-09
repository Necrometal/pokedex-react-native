import { getFontSize } from '@/utils/responsive';
import { StyleSheet } from 'react-native';



export const styles = StyleSheet.create({
  headline: {
    fontSize: getFontSize(24),
    lineHeight: getFontSize(32),
    fontWeight: 'bold'
  },
  caption: {
    fontSize: getFontSize(8),
    lineHeight: getFontSize(12),
    fontWeight: 'regular'
  },
  subtitle1: {
    fontSize: getFontSize(14),
    lineHeight: getFontSize(16),
    fontWeight: 'bold'
  },
  subtitle2: {
    fontSize: getFontSize(12),
    lineHeight: getFontSize(16),
    fontWeight: 'bold'
  },
  subtitle3: {
    fontSize: getFontSize(10),
    lineHeight: getFontSize(16),
    fontWeight: 'bold'
  },
  body1: {
    fontSize: getFontSize(14),
    lineHeight: getFontSize(16),
    fontWeight: 'regular'
  },
  body2: {
    fontSize: getFontSize(12),
    lineHeight: getFontSize(16),
    fontWeight: 'regular'
  },
  body3: {
    fontSize: getFontSize(10),
    lineHeight: getFontSize(16),
    fontWeight: 'regular'
  }
})