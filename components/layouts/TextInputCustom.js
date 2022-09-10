import Styles from "../styles/Styles";
import { Text, View, TextInput } from "react-native";
import { useRef } from "react";

function TextInputCustom({
    label,
    value,
    onChangeText,
    placeholder,
    editable = true,
    secureTextEntry = false
}) {

    const refInput = useRef();

    return (
        <View style={Styles.viewInput}>
            <Text style={Styles.labelInput}>{label}</Text>
            <TextInput
                ref={refInput}
                onFocus={() => {
                    refInput.current.setNativeProps({
                        style:
                        {
                            borderColor: '#0AAD7C', borderWidth: 1
                        }
                    });
                }}
                onBlur={() => {
                    refInput.current.setNativeProps({
                        style: {
                            borderColor: value ? '#0AAD7C' : '#ff4040',
                            borderWidth: 1
                        }
                    });
                }}
                value={value}
                onChangeText={onChangeText}
                style={Styles.input}
                placeholder={placeholder}
                editable={editable}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

export default TextInputCustom;