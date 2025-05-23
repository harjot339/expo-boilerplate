import LayoutStyles from '@theme/Layout';

import useTheme from './useTheme';

const useLayoutStyles = () => {
  const { Colors } = useTheme();
  const Layout = LayoutStyles({ Colors });
  return Layout;
};

export default useLayoutStyles;
