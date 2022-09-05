import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Answers from './components/screens/Answers';
import Home from './components/screens/Home';
import Question from './components/screens/Question';
import Login from './components/screens/Login';
import QuestionsByUser from './components/screens/QuestionsByUser';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Home' }}
        />

        <Stack.Screen
          name="QuestionsByUser"
          component={QuestionsByUser}
          options={{ title: 'Suas questões' }}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: 'Entrar' }}
        />

        <Stack.Screen
          name="Answers"
          component={Answers}
          options={{ title: 'Respostas' }}
        />

        <Stack.Screen
          name="Question"
          component={Question}
          options={{ title: 'Questão' }}
        />

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
});
