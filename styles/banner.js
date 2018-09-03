import { StyleSheet } from "react-native";

export default StyleSheet.create({
  slideIndicator: {
    width: "100%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  slideIndicator__dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
    opacity: 0.4,
    marginLeft: 5
  },
  slideIndicator__dot_active: {
    opacity: 1
  },
  slideIndicator__dot_dark: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#000000",
    opacity: 0.2,
    marginLeft: 5
  },
  slideIndicator__dot_dark_active: {
    opacity: 0.7
  },
  banner: {
    width: "100%",
    backgroundColor: "#FFFFFF"
  },
  banner__image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },
  banner_normal: {
    height: 180
  },
  banner_mini: {
    height: 100
  }
});
