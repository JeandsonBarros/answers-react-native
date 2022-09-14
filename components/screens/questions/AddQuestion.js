import { View } from 'react-native';
import { postQuestion } from '../../../services/QuestionsService';
import FormQuestion from '../../layouts/FormQuestion';


function AddQuestion({ navigation, route }) {

    async function saveQuestion(question) {

        const message = await postQuestion(question)
        alert(message);

        if (message == 'Questão salva')
            navigation.navigate('QuestionsByUser')
    }

    return (
        <View style={{ flex: 1 }}>

            <FormQuestion
                buttonText='Salvar'
                actionButton={saveQuestion}
            />

        </View>);
}

export default AddQuestion;