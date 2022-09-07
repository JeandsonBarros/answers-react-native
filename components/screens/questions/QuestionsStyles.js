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
        backgroundColor: '#e6e6e6',
        flexDirection: 'row',
        borderRadius: 10,
    },

    textInputSearch: {
        width: '90%',
        height: '100%',
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
    },

    /* ======== QuestionsByUser Styles ====== */

    viewEditAndDelete: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginBottom: 10,
        borderBottomColor: 'rgb(215, 215, 215)',
        borderBottomWidth: 1,
        paddingBottom: 10,
    },

    buttonEdit: {
        flex: 1,
        height: 30,
        borderBottomStartRadius: 7,
        borderTopStartRadius: 7,
        backgroundColor: '#0AAD7C',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonDelete: {
        flex: 1,
        height: 30,
        borderBottomEndRadius: 7,
        borderTopEndRadius: 7,
        backgroundColor: '#ff4040',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButon: {
        textAlign: 'center',
        fontSize: 20,
        color: '#fff',
        marginRight: 5
    },

});