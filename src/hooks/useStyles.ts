import { ThemeColors } from '@theme/constants';

import useLayoutStyles from './useLayoutStyles';
import useTheme from './useTheme';

const useStyles = <T extends (colors: ThemeColors) => ReturnType<T>>(
  styleFunction: T,
) => {
  const { darkMode, Colors, currentTheme, changeTheme, toggleTheme } =
    useTheme();
  const Layout = useLayoutStyles();
  return {
    dynamicStyles: styleFunction(Colors),
    Colors,
    darkMode,
    Layout,
    currentTheme,
    changeTheme,
    toggleTheme,
  };
};

export default useStyles;
