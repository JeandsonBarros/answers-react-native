import { TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { asToken } from '../../services/TokenService';

export default function HeaderRight({ navigation }) {

    return (
        <>
            <TouchableOpacity
                onPress={async () => {
                
                    const asSetToken = await asToken()
                    asSetToken? navigation.navigate('UserConfig') : navigation.navigate("Login")

                }}
            >
                <Svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} fill="#19242E" class="bi bi-person-fill" viewBox="0 0 16 16">
                    <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </Svg>
            </TouchableOpacity>
        </>);
}

