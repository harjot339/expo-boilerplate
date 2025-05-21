import { ThemeColors } from '../theme/constants';
import LayoutStyles from '../theme/Layout';
import useTheme from './useTheme';

const useStyles = <T extends (colors: ThemeColors) => ReturnType<T>>(
  styleFunction: T,
) => {
  const { darkMode, Colors, currentTheme, changeTheme, toggleTheme } =
    useTheme();
  const Layout = LayoutStyles({ Colors });
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
