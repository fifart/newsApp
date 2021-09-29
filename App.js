import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as WebBrowser from 'expo-web-browser';
import PostsList from './src/screens/PostsList';
import PostShow from './src/screens/PostShow';
import RenderHtml from 'react-native-render-html';

const HomeScreen = ( { navigation } ) => {

  const [radioUrl, setRadioUrl] = useState(null);
  const _handlePressButtonAsync = async () => {
    let radioUrl = await WebBrowser.openBrowserAsync('https://panionia-idea.gr/panionia-idea-radio/');
    setResult(radioUrl);
  };

  return (
    <View style={styles.container}>
    <Text>Welcome to The Home Screen</Text>
    <Button
    style={styles.buttons} 
    title="About Us"
    onPress={() => navigation.navigate('About')}
    />
    <Text></Text>
    <Button
    style={styles.buttons} 
    title="Posts"
    onPress={() => navigation.navigate('Posts')}
    />
    <Text></Text>
    <Button
    style={styles.buttons} 
    title="Liste to the Radio"
    onPress={_handlePressButtonAsync}
    />
    </View>
  );
}

const AboutScreen = () => {
  return (
    <View style={styles.container}>
      <Text>is the About Screen</Text>
    </View>     
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Posts" component={PostsList} />
        <Stack.Screen name="Post" component={PostShow} 
        options={({ route }) => ({ 
          title: route.params.title
          })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    top: 20,
    bottom: 10
  }
});
