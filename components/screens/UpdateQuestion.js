import { Text, View, ScrollView } from "react-native";
import FormQuestion from '../layouts/FormQuestion';
import Navbar from '../layouts/Navbar';

function UpdateQuestion({ navigation, route }) {
    return (
       
            <View style={{ flex: 1}}>

                <FormQuestion
                    buttonText="Editar"
                />

                <Navbar
                    navigation={navigation}
                    route={route}
                />

            </View>
       
    );
}

export default UpdateQuestion;