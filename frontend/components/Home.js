import React, { useState, useEffect } from "react";
import {StyleSheet,Text,SafeAreaView,ActivityIndicator, View} from "react-native";
import { ImageBackground } from "react-native-web";
import List from "../components/List";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [BackendData, setBackendData] = useState();
  const [Reply, setReply] = useState("Nothing");

  var imageURL

  function imageDisplay (item)  {
    console.log("Item is: "+item)
    if (item = 'Orange'){
        item = ('../components/Orange.png')
        imageURL = item
        console.log("Should have updated imageURL to: "+item)
    }
  }

  if(Reply == "Nothing"){
  return (
    <View style={ styles.container }>
        <ImageBackground source={require('../components/BackgroundImage.jpeg')} style={styles.backgroundImage} >
          <View>
            {!clicked && <Text style={styles.title}></Text>}
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
              Reply = {Reply}
              setReply = {setReply}
              
            />
            {console.log("HomePage info:"+Reply)}
            {/* {imageDisplay(Reply)} */}
            </View>
        </ImageBackground>

          <img alt="Day Night" src={require('../components/BackgroundImage.jpeg')}/>
      </View>
      
  );
}
else{
  return (
    <View style={ styles.container }>
        <ImageBackground source={require('../components/BackgroundImage.jpeg')} style={styles.backgroundImage} >
          <View>
            {!clicked && <Text style={styles.title}></Text>}
            <SearchBar
              searchPhrase={searchPhrase}
              setSearchPhrase={setSearchPhrase}
              clicked={clicked}
              setClicked={setClicked}
              Reply = {Reply}
              setReply = {setReply}
              
            />
            {console.log("HomePage info:"+Reply)}
            {/* {imageDisplay(Reply)} */}
            </View>
        </ImageBackground>

          <img alt="Day Night" src={require('../components/BackgroundImage.jpeg')}/>
          //<Text> Throw to : {Reply}</Text>
      </View>
  );
}
}


const styles = StyleSheet.create({
  root: {

  },
  title: {
    marginTop: 30,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
  container: {

  },

  backgroundImage: {
    backgroundPosition: 'center',
    backgroundSize: 'stratch',
    backgroundRepeat: 'repeat',
    flex: 1,
    resizeMode: 'stretch', // or 'stretch',
    justifyContent: 'center'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default Home;