import { View, Image } from 'react-native';

function Load({ visible }) {

    return (
        <>
            {visible && <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: 10
            }}>
                <Image
                    style={{ height: 50, width: 60, padding: 10, }}
                    source={require('../../assets/loading.gif')}
                />
            </View>}
        </>
    );
}

export default Load;