import { StyleSheet } from "react-native";

export default StyleSheet.create({

    
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
       
        color: "#19242E"

    },
    titleCard: {
        fontSize: 15,
        color: "#19242E",
        marginLeft: 3
    },

    textCard: {
        margin: 10,
        color: "#19242E"
    },

    viewTitleCard: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    viewCardQuantity: {
       
        width: '100%',     
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginStart: 10,
        marginEnd: 10
    },

    textQuantity: {
        margin: 5, color: '#19242E', alignItems: 'center'
    },
    /* ============ Modal Login UserData =============*/

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        width: '95%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },

    buttonClose: {
        backgroundColor: "#0AAD7C",
    },
    buttonDeleteAccount: {
        backgroundColor: "#ff4040",
    },

    textStyle: {
        color: "white",
        textAlign: "center"
    },

    /* =========== Start input password ===========  */

    eyeButton: {
        position: 'absolute',
        right: 20,
        alignItems: 'center',
        top: 37
    }

    /* =========== End input password ===========  */

});

