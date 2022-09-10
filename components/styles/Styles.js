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
        marginTop: 20,
        width: '100%'
    },

    labelInput:{
        marginLeft: 10,
        color: "#19242E",
        marginBottom:5
    },

    input:{
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 10,
        paddingLeft: 15,
        height: 50,
        borderWidth: 0.5,
        borderColor: 'rgb(115, 115, 115)'
    },

   /*  inputFocus:{
        borderColor: '#0AAD7C'
    }, */

    button:{
        backgroundColor: '#0AAD7C',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        margin: 10
    },

    textButton: { 
        color: '#fff',
        textAlign: 'center',
        fontSize: 20 
        },

});

