import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';

import HeaderRight from './components/layouts/HeaderRight';

import AddQuestion from './components/screens/questions/AddQuestion';
import Answers from './components/screens/answers/Answers';
import Home from './components/screens/questions/Home';
import Login from './components/screens/user/Login';
import Question from './components/screens/questions/Question';
import QuestionsByUser from './components/screens/questions/QuestionsByUser';
import UpdateQuestion from './components/screens/questions/UpdateQuestion';
import UserConfig from './components/screens/user/UserConfig';
import UserData from './components/screens/user/UserData';
import UserRegister from './components/screens/user/UserRegister';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Home">

        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation }) => ({
            title: "Home",
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTintColor: '#1c1c1c',
            headerRight: () => <HeaderRight navigation={navigation} />,
          })}
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

        <Stack.Screen
          name="AddQuestion"
          component={AddQuestion}
          options={{ title: 'Nova questão' }}
        />

        <Stack.Screen
          name="UpdateQuestion"
          component={UpdateQuestion}
          options={{ title: 'Editar questão' }}
        />

        <Stack.Screen
          name="UserConfig"
          component={UserConfig}
          options={{ title: 'Configurações da conta' }}
        />
        
        <Stack.Screen
          name="UserData"
          component={UserData}
          options={{ title: 'Dados da conta' }}
        />

        <Stack.Screen
          name="UserRegister"
          component={UserRegister}
          options={{ title: 'Cadastro' }}
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
