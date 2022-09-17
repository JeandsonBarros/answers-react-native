import { StyleSheet } from "react-native";

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
      },

    title: {
        fontSize: 16,
        color: "#19242E"
    },

    form: {
        display: "flex",
        alignItems: "center",
        flex: 1,
    },

    viewInput: {
        marginTop: 20,
        width: '100%'
    },

    labelInput: {
        marginLeft: 10,
        color: "#19242E",
        marginBottom: 5
    },

    input: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#e6e6e6',
        borderRadius: 5,
        paddingLeft: 15,
        height: 50,
        borderWidth: 0.5,
        borderColor: 'rgb(115, 115, 115)'
    },

    /*  inputFocus:{
         borderColor: '#0AAD7C'
     }, */

    button: {
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

    search: {

        height: 45,
        alignItems: 'center',

        backgroundColor: '#e9e9e9',
        flexDirection: 'row',

        zIndex: 2,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,


    },

    textInputSearch: {
        width: '90%',
        height: '100%',
    },

    buttonPagination: {
        backgroundColor: '#0AAD7C',
        borderRadius: 10,
        margin: 15,
        padding: 10
    },

    textButtonPagination:{
        color: '#fff',
        fontSize: 20,
        textAlign: 'center',
    }

});

