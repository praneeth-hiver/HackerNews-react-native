import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

const NewsComponent = ({item}) => {
    return (
        <View style = {styles.newsStyle}>
            <View style = {styles.score}>
                <Text>{item.points}</Text>
            </View>
            <View style = {styles.title}>
                <Text>{item.title}</Text>
                {/* <Text>{item.url}</Text> */}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    newsStyle:{
        flex: 1,
        flexDirection: "row",
        margin: 4
    },
    score: {
        height: Math.round(Dimensions.get('window').width)/7.5,
        width: Math.round(Dimensions.get('window').width)/7.5,
        borderRadius: 50,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center"

    },
    title: {
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        margin: 3,
        padding: 10,
        alignItems: "flex-start",
        justifyContent: "center",
        width: Math.round(Dimensions.get('window').width)
    }
});

export default NewsComponent;