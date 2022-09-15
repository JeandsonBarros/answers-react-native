import {  View, Image } from 'react-native';

function Load() {

    return (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',   
            width: '100%',
            marginBottom: 80,
            marginTop: 20
        }}>
            <Image
            style={{height: 50, width: 60, padding: 10,}}
                source={require('../../assets/loading.gif')}
            />
        </View>
    );
}

export default Load;