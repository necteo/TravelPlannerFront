import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: 92,
    backgroundColor: "white",
  },
  contents: {
    zIndex: -3,
  },
  timeline: {
    backgroundColor: "red",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 24,
    paddingHorizontal: 10,
  },
  foot: {
    height: 60,
    backgroundColor: "teal",
    zIndex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  scrollBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  pathCountBox: {
    flex: 1,
    marginTop: 10,
    backgroundColor: "white",
  },
  pathBox: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: "white",
    width: 300,
    height: 70,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 15,
  },
  pathText: {
    fontSize: 25,
  },
  pathName: {},
  likeIcon: {
    flexDirection: "row",
  },
  likeIconN: {},
  likeIconY: {},
  likeCount: {
    fontSize: 25,
  },
  travelDestinationListBox: {
    flex: 1,
    alignItems: "center",
  },
  travelDestinationBox: {
    flexDirection: "row",
    marginTop: 10,
    padding: 10,
    backgroundColor: "white",
    width: 300,
    height: 70,
    borderWidth: 2,
    borderStyle: "solid",
    alignItems: "center",
    justifyContent: "center",
  },
  touristScrollView: {
    marginTop: 10,
    marginBottom: 30,
  },
  styledText: {
    color: "#111",
    fontWeight: "bold",
    fontSize: 24,
  },
  swipeListItem: {
    alignItems: "center",
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 80,
    backgroundColor: "#eee",
  },
  swipeHiddenItemContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "row",
  },
  swipeHiddenItem: {
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  swipeHiddenItemText: {
    color: "white",
    fontSize: 14,
  },
});
