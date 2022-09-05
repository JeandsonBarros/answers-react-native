import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* ============ Home Styles ============= */
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    titleHome: {
        fontSize: 25,
        color: "#19242E",
        margin: 10
    },

    addButton: {
        position: 'absolute',
        bottom: 100,
        right: 30,
        backgroundColor: '#fff',
        borderRadius: 50
    },

    search: {
        marginTop: 10,
        height: 35,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#F1F1F1',
        flexDirection: 'row',
        borderRadius: 10,
    },

    textInputSearch:{
        width: '90%',
        height: '100%'
    },

    /* ============ Question Styles ============= */

    card: {
        padding: 10,
        backgroundColor: '#FBFBFB',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

        borderRadius: 10,
        margin: 10,
        minWidth: '95%',

        color: "#19242E"

    },
    title: {
        fontSize: 16,
        color: "#19242E"
    },

    statement: {
        color: "#19242E"
    }

});