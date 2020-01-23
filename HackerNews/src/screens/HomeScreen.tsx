import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text,FlatList, SafeAreaView} from 'react-native';
import SearchBar from '../components/SearchBar';
import useNews from '../hooks/useNews';
import NewsComponent from '../components/NewsComponent';


const HomeScreen = () => {
  const [term, setTerm] = useState('');
  const [results, getResults] = useNews([]);

  // useEffect(() => {
  //   getResults('Voila!');
  //   console.log("effect")
  // }, []);

    return (
      <>
        <SafeAreaView>
            <View style = {styles.bodyBackground}>
              <SearchBar 
                kind = "Search"
                term = {term} 
                onTermChangeGetNews = {(newText) => {
                  setTerm(newText);
                  getResults(term);
                }}
                // getNews = {() => {getResults(term)}}
              />
            </View>
            {/* <Text>{results.length}</Text> */}
            <FlatList
              virticle
              data = {results}
              keyExtractor = {(results) => results.objectId}
              renderItem = {({item}) => {
              return <NewsComponent item = {item}/>
              }}
            />
        </SafeAreaView>    
      </>
    );
};

const styles = StyleSheet.create({
    bodyBackground: {
      backgroundColor: "#F6F6EF"
    }
});

export default HomeScreen;