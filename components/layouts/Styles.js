import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    /* ================= Navbar styles =============== */
    navBar: {
        width: '100%',
        backgroundColor: "#19242E",
        position: "absolute",
        bottom: 0,
        height: 70,
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    buttonNavSelect: {
        backgroundColor: '#0AAD7C',
        borderRadius: 10,
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonNav: {
        borderRadius: 10,
        width: 60,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },

    /* ================= Card styles =============== */

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
        height: 140,
        color: "#19242E"

    },
    titleCard: {
        fontSize: 15,
        color: "#19242E",
        marginLeft: 3
    },

    textCard: {
        color: "#19242E"
    },

    viewTitleCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewCardQuantity: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },

    textQuantity: {
        margin: 5, color: '#19242E', alignItems: 'center'
    },

   

});