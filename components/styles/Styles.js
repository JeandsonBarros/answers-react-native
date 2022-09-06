import { StyleSheet } from "react-native";

export default StyleSheet.create({

    title: {
        fontSize: 16,
        color: "#19242E"
    },

    form:{
        display: "flex",
        alignItems: "center",
        flex: 1,
    },
    
    viewInput:{   
        marginHorizontal: 50,
        marginTop: 20,
        width: '80%'
    },

    labelInput:{
        color: "#19242E",
        marginBottom:5
    },

    input:{
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        paddingLeft: 15,
        height: 50,
    },

    button:{
        backgroundColor: '#0AAD7C',
        borderRadius: 10,
        width: 100,
        height: 50,
        justifyContent: 'center',
        margin: 30
    },

    textButton: { 
        color: '#fff',
        textAlign: 'center',
        fontSize: 30 
        },

});

