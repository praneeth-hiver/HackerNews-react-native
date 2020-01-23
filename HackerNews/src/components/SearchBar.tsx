import React from 'react'
import {View, TextInput, StyleSheet} from 'react-native'

const SearchBar = ({term, onTermChangeGetNews, kind}) => {
    return (
    <View style = {styles.background}>
        <TextInput 
            placeholder = {kind}
            value = {term}
            onChangeText = {onTermChangeGetNews}
            // onEndEditing = {getNews}
            autoCapitalize = "none"
        />
    </View>
    );
};

const styles = StyleSheet.create({
    background:{
        backgroundColor: "white",
        height: 40,
        borderRadius: 4,
        margin: 4,
        padding: 5,
        borderColor: "black",
    }
});

export default SearchBar;