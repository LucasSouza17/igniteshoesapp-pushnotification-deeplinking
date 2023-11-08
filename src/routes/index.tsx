import {useEffect, useState} from 'react'
import * as Linking from 'expo-linking'

import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import { AppRoutes } from './app.routes';
import { NotificationWillDisplayEvent, OSNotification, OneSignal } from 'react-native-onesignal';
import { Notification } from '../components/Notification';

const linking = {
  prefixes: ['igniteshoesapp://', 'com.lucassouza.igniteshoesapp://'],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const { colors } = useTheme();
  const [notification, setNotification] = useState<OSNotification | undefined>(undefined);

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  // const deepLinking = Linking.createURL('details', {
  //   queryParams: {
  //     productId: '7'
  //   }
  // })

  // console.log(deepLinking)

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      (NotificationReceivedEvent: NotificationWillDisplayEvent) => {
        const response = NotificationReceivedEvent.getNotification();
        setNotification(response);
      }
    );

    return () => unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {notification && (
        <Notification data={notification} onClose={() => setNotification(undefined)} />
      )}
    </NavigationContainer>
  );
}