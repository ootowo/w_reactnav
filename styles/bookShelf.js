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
    height: 200,
    flex: 1,
    alignItems: "center"
  },
  bookItem__bg: {
    width: "100%",
    height: 100,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    resizeMode: "contain",
    zIndex: 98
  },
  bookItem__thumbnail: {
    width: 105,
    height: 130,
    backgroundColor: "#FFFFFF",
    zIndex: 99,
    alignSelf: "center"
  },
  bookItem__title: {
    width: "100%" - 14,
    padding: 8,
    borderRadius: 15,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    position: "absolute",
    bottom: 85,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 15,
    zIndex: 99
  },
  bookItem__title_text: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "transparent"
  }
});
