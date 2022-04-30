import React, { useState, useEffect } from "react";
import {StyleSheet,Text,SafeAreaView,ActivityIndicator, View} from "react-native";
import { ImageBackground } from "react-native-web";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [BackendData, setBackendData] = useState();

  
  // Get data from Backend Server --- Tar
  //useEffect(() => {
    //const getData = async () => {
      //---------------------------------------------------------//
      // Backend Server with JSON address should be here
      //---------------------------------------------------------//
      /*const apiResponse = await fetch(
        
      );
      const data = await apiResponse.json(); */

      //---------------------------------------------------------//
      // Delete this when Backend Server data is ready
      //---------------------------------------------------------//


      //setBackendData(data);
    //};
    //getData();
  //}, []);

  return (
    <View style={ styles.container }>
        <ImageBackground source={require('../components/BackgroundImage.jpeg')} style={styles.backgroundImage} >
          <View style={ styles.root}>
            {!clicked && <Text style={styles.title}>Trash</Text>}
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
            />
           {(
            <List
              searchPhrase={searchPhrase}
              data={BackendData}
              setClicked={setClicked}
            />    
           )}
            </View>
        </ImageBackground>
      </View>
      /*
    <ImageBackground source={require('../components/BackgroundImage.jpeg')} style={{width: '100%', height: '100%',}}>
    <View style={styles.root}>
      {!clicked && <Text style={styles.title}>Trash</Text>}
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
      {(
          <List
            searchPhrase={searchPhrase}
            data={BackendData}
            setClicked={setClicked}
          />

      )}
    </View>
    </ImageBackground> */
  );
};

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    alignContent:'stretch'
  },
  title: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  container: {
    flex: 1,
  },

  backgroundImage: {
    flex: 1,
    resizeMode: 'stretch', // or 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default Home;