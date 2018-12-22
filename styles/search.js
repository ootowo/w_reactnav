import { StyleSheet, Platform } from "react-native";

export default StyleSheet.create({
  searchBar: {
    backgroundColor: "#F8F8F8",
    padding: 10
  },
  searchBar__container: {
    flex: 0,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#EEEEEE",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  searchBar__text: {
    marginLeft: 10,
    fontSize: 15,
    flex: 1
  }
});
