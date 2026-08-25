import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CreateDropScreen from './src/screens/CreateDropScreen';
import ClaimDropScreen from './src/screens/ClaimDropScreen';
import AuditScreen from './src/screens/AuditScreen';
import { initDatabase } from './src/lib/sqlite';

export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Claim: undefined;
  Audit: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0f172a',
    background: '#f8fafc',
    card: '#ffffff',
    text: '#0f172a',
    border: '#e2e8f0',
    notification: '#dc2626',
  },
};

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;

    Promise.resolve(initDatabase())
      .then(() => {
        if (mounted) setReady(true);
      })
      .catch((error: unknown) => {
        console.warn('Dead drop database initialization failed:', error);
        if (mounted) setReady(true);
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <StatusBar barStyle="dark-content" />
        <ActivityIndicator size="large" color="#0f172a" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerBackTitle: 'Back',
          headerTintColor: '#0f172a',
          headerStyle: { backgroundColor: '#ffffff' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Dead Drops' }} />
        <Stack.Screen
          name="Create"
          component={CreateDropScreen}
          options={{ title: 'Create Drop', presentation: 'modal' }}
        />
        <Stack.Screen
          name="Claim"
          component={ClaimDropScreen}
          options={{ title: 'Claim Drop', presentation: 'modal' }}
        />
        <Stack.Screen name="Audit" component={AuditScreen} options={{ title: 'Audit Trail' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
  },
});

export default App;