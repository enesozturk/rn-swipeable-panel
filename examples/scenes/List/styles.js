import { StyleSheet, Dimensions } from "react-native";

export const FULL_HEIGHT = Dimensions.get("window").height;
export const FULL_WIDTH = Dimensions.get("window").width;

export const Styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
    width: FULL_WIDTH,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundColor: "#82B7E9"
  },
  flatList: {
    width: FULL_WIDTH,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16
  }
});
