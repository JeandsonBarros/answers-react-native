import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveToken(token) {
    try {
        await AsyncStorage.setItem("token", JSON.stringify(token))
        return true
    } catch (error) {
        return false
    }

}

export async function deleteToken() {
    try {
        AsyncStorage.removeItem("token")
        return true
    } catch (error) {
        return false
    }

}

export async function asToken() {
    try {
        const token = await AsyncStorage.getItem("token")
        return token ? true : false
    } catch (error) {
        return false
    }

}

export async function getToken() {
    try {
        
        let token = await AsyncStorage.getItem("token")
       
        return token

    } catch (error) {
        return false
    }

}