import { View } from "react-native";
import Navbar from '../layouts/Navbar';
import FormQuestion from '../layouts/FormQuestion';
import { postQuestion } from "../../services/QuestionsService";
function AddQuestion({ navigation, route }) {

    async function saveQuestion(question){
        
      const message = await  postQuestion(question)
      alert(message);

      if(message=='Questão salva') 
        navigation.navigate('QuestionsByUser')
    }

    return (
        <View style={{ flex: 1 }}>

            <FormQuestion 
                buttonText='Salvar'
                actionButton={saveQuestion}
            />

            <Navbar
                navigation={navigation}
                route={route}
            />

        </View>);
}

export default AddQuestion;