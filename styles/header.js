import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
    headerProfile: {
        justifyContent: "center",
        flexDirection: "row",
        paddingLeft: 15
    },
    headerProfile__profileImage: {
        width: 40,
        height: 40,
        backgroundColor: "#EEEEEE",
        borderRadius: 20,
        flex: 0
    },
    headerProfile__profileName: {
        height: 40,
        lineHeight: 40,
        marginLeft: 15,
        fontWeight: "bold"
    }
});
