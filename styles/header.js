import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  headerProfile: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingLeft: 15,
    paddingBottom: 3
  },
  headerProfile__profileImage: {
    width: 40,
    height: 40,
    backgroundColor: "#000000",
    borderRadius: 20,
    flex: 0,
    overflow: "hidden"
  },
  headerProfile__profileImage_image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  headerProfile__profileName: {
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 15
  },
  headerProfile__profileName_text: {
    fontWeight: "bold"
  }
});
