import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";


// function getData(ItemName) {
//   let url = 'http://localhost:5050/item/'+ItemName+''
//   console.log(url)
//   return fetch(url)
//   .then((response) => response.json())
//   .then((responseJson) => {
//     console.log("Got From DB: "+JSON.stringify(responseJson))
//     var data = JSON.stringify(responseJson)
//     return data;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// }


const SearchBar = ({ clicked, searchPhrase, setSearchPhrase, setClicked , Reply, setReply }) => {
  //searchPhrase = 'Glass Bottle'
  return (
    <View style={styles.container}>
      <View
        style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>

        {/* Search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{ marginLeft: 1 }}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              let url = 'http://localhost:5050/item/'+searchPhrase+''
              console.log(url)
              return fetch(url)
              .then((response) => response.json())
              .then((responseJson) => {
                console.log("Got From DB: "+JSON.stringify(responseJson))
                var data = JSON.stringify(responseJson.trash)
              setReply(data)
              Reply = data;
            })
            }
          }}
        />
        {/* x - Cancel Icon */}
        {clicked && (
          <Entypo name="cross" size={18} color="black" style={{ padding: 1 }} onPress={() => {
            setSearchPhrase("")
          }} />
        )}
      </View>
      {/* cancel button */}
      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          ></Button>
        </View>
      )}
    </View>
  );


};
export default SearchBar;

const styles = StyleSheet.create({
  container: {
    margin: 15,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "90%",

  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
  },
  searchBar__clicked: {
    padding: 10,
    //paddingTop:80,
    flexDirection: "row",
    width: "95%",
    backgroundColor: "#d9dbda",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: "90%",
  },
});