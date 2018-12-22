import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS == "ios" ? "transparent" : "rgba(0, 0, 0, 0.8)"
  },
  wrapper: {
    width: "100%",
    height: "100%",
    flex: 0,
    flexDirection: "column",
    zIndex: 99
  },
  wrapper__body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  socialPage__header: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold"
  },
  socialPage__buttonGroup: {
    width: "70%",
    marginTop: 40
  },
  socialPage__socialButton: {
    width: "100%",
    height: 55,
    borderBottomWidth: 3,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center"
  },
  socialPage__socialButton__text: {
    fontWeight: "bold",
    color: "#FFFFFF"
  },
  socialPage__socialButton_facebook: {
    backgroundColor: "#3b5998",
    borderBottomColor: "#2f4779",
    marginBottom: 10
  },
  socialPage__socialButton_youtube: {
    backgroundColor: "#cc181e",
    borderBottomColor: "#a31318",
    marginBottom: 10
  },
  socialPage__socialButton_www: {
    backgroundColor: "#b8b8b8",
    borderBottomColor: "#9c9c9c"
  },
  closeButton: {
    width: "100%",
    height: 50,
    flex: 0,
    backgroundColor: "#FF0000",
    alignItems: "center",
    justifyContent: "center"
  },
  closeButton__text: {
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  blurBgAbsolute: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 98
  }
});
