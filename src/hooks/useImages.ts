import { DARK_IMAGES, IMAGES } from '@utils/images';

import useTheme from './useTheme';

const useImages = () => {
  const { darkMode } = useTheme();
  return { ...IMAGES, ...(darkMode ? DARK_IMAGES : {}) };
};

export default useImages;
