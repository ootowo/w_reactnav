import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    height: "100%"
  },
  bookShelf__bg: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "repeat"
  },
  bookItem: {
    width: "50%",
    height: "100%" / 3,
    flex: 1,
    alignItems: "center"
  },
  bookItem__bg: {
    width: "100%",
    height: 80,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "cover",
    zIndex: 98
  },
  bookItem__thumbnail: {
    width: 75,
    height: 95,
    backgroundColor: "#FFFFFF",
    zIndex: 99,
    alignSelf: "center"
  },
  bookItem__title: {
    width: "100%" - 20,
    padding: 3,
    borderRadius: 15,
    backgroundColor: "rgba(136, 136, 136, 0.8)",
    position: "absolute",
    bottom: 80,
    left: 10,
    right: 10,
    alignItems: "center",
    justifyContent: "center",
    // marginHorizontal: 20,
    zIndex: 99
  },
  bookItem__title_text: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent"
  }
});
