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
    lineHeight: 40,
    marginLeft: 15,
    fontWeight: "bold"
  }
});
