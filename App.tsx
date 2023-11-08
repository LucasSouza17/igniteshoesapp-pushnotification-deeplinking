import {useEffect} from 'react'
import { OneSignal } from "react-native-onesignal";
import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";

import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserInfoCreate } from "./src/notifications/notificationsTags";

OneSignal.initialize("70796bbe-1fac-431c-ba4d-0bf7a85a9867");

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal.Notifications.addEventListener('click', (response) => {
      const actionId = response.result.actionId
      
      switch(actionId) {
        case '1': 
          return console.log('Ver solicitação');
        case '2':
          return console.log('Abrir app');
        default:
          return console.log('Não foi clicado botão de ação');
      }
    })

    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <CartContextProvider>{fontsLoaded ? <Routes /> : <Loading />}</CartContextProvider>
    </NativeBaseProvider>
  );
}
