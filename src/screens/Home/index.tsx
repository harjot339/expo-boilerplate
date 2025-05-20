import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import { STRINGS } from '../../shared/constants/strings';
import { useAppDispatch } from '../../redux/store';
import { logoutUser } from '../../redux/CommonReducer';

const Home = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };
  return (
    <>
      <View
        style={{
          display: 'flex',
          height: '100%',
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: 'black' }}>{STRINGS.HI}</Text>
        <Pressable
          onPress={() => {
            console.log(i18n.language);
            i18n.changeLanguage(i18n.language === 'en' ? 'hi' : 'en');
          }}
        >
          <Text>Translate</Text>
        </Pressable>
        <Pressable onPress={logout}>
          <Text>Logout</Text>
        </Pressable>
      </View>
    </>
  );
};
export default Home;
