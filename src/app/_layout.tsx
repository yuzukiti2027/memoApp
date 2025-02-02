import { Stack } from 'expo-router';

const Layout = (): JSX.Element => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#33b251',
        },
        headerTitle: 'Memo App',
        headerTintColor: '#ffffff',
        headerBackTitle: 'Back',
        headerTitleStyle: {
          fontSize: 22,
          fontWeight: 'bold',
        },
      }}
    />
  );
};

export default Layout;
