import { View, TextInput } from "react-native";
import Svg, { Path } from 'react-native-svg';
import Styles from '../styles/Styles'

function SearchInput({ placeholder, value, onChangeText }) {
    return (
        <View style={Styles.search}>

            <Svg style={{ margin: 5 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#19242E" class="bi bi-search" viewBox="0 0 16 16">
                <Path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </Svg>

            <TextInput
                style={Styles.textInputSearch}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />

        </View>
    );
}

export default SearchInput;