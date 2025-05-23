import { ThemeColors } from '@theme/constants';
import { StyleSheet } from 'react-native';

const styles = (Colors: ThemeColors) =>
  StyleSheet.create({
    button: {
      color: Colors.white,
    },
  });

export default styles;
