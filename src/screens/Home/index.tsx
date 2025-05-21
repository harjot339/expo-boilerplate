import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { STRINGS } from '../../shared/constants/strings';
import { useAppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/CommonReducer';
import useStyles from '../../hooks/useStyles';
import styles from './styles';

const Home = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  const { dynamicStyles, Layout, toggleTheme } = useStyles(styles);
  return (
    <>
      <View
        style={[Layout.flex, Layout.center, { borderWidth: 1, height: '100%' }]}
      >
        <Text style={[dynamicStyles.button]}>{STRINGS.HI}</Text>
        <Pressable
          onPress={() => {
            console.log(i18n.language);
            i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
          }}
        >
          <Text>Translate</Text>
        </Pressable>
        <Pressable onPress={toggleTheme}>
          <Text>Change Theme</Text>
        </Pressable>
        <Pressable onPress={logout}>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </>
  );
};
export default Home;
