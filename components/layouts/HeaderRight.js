import { TouchableOpacity, Text } from "react-native";
import {logout} from "../../services/AuthService";

function HeaderRight({navigation}) {
    return (
        <>
            <TouchableOpacity
                onPress={async ()=> {
                   
                   logoutStatus = await logout()
                   logoutStatus? navigation.navigate('Home') : alert("Erro ao deslogar!") 
                }}
            >
                <Text>Sair</Text>
            </TouchableOpacity>
        </>);
}

export default HeaderRight;