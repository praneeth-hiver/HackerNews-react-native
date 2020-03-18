import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
  Linking,
  Share,
  Animated
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

const NewsComponent = ({ item }) => {
  const size = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const [fadeIn] = useState(new Animated.Value(0));
  const [fav, setFav] = useState("grey");

  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }, []);

  const cardColor = [
    "#9FBCC2",
    "#AFC7BF",
    "#C7CFC0",
    "#DDD6CA",
    "#EEDFDA",
    "#9FBCC2"
  ];

  const bg = () => {
    Animated.timing(size, {
      toValue: 15000,
      duration: 700
    }).start(() => {
      alert();
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500
      }).start(() => {
        Animated.timing(size, {
          toValue: 0,
          duration: 1
        }).start(() => {
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1
          }).start();
        });
      });
    });
  };
  const alert = () => {
    return Alert.alert(
      "Look up?",
      "",
      [
        {
          text: "Google it",
          onPress: () => Linking.openURL(item.url)
        },
        {
          text: "Cancel",
          style: "cancel"
        }
      ],
      { cancelable: false }
    );
  };

  const renderSave = () => {
    return (
      <View
        style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}
      >
        <FontAwesomeIcon
          icon={faStar}
          style={{ ...styles.icon, color: fav }}
          size={40}
        />
      </View>
    );
  };
  return (
    <Animated.View style={{ opacity: fadeIn }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.margin}
        onPress={e => {
          bg();
        }}
        delayLongPress={500}
        onLongPress={() =>
          Share.share({ message: `${item.url}`, url: item.url })
        }
      >
        <Swipeable renderLeftActions={renderSave}>
          <View
            style={styles.card}
            backgroundColor={cardColor[Math.floor(Math.random() * 6)]}
          >
            <Animated.View
              style={{
                opacity: opacity,
                position: "absolute",
                alignSelf: "center",
                transform: [{ translateX: 70 }, { translateY: -20 }],
                backgroundColor: "white",
                height: size,
                width: size,
                borderRadius: size,
                overflow: "visible"
              }}
            ></Animated.View>
            <View style={styles.score}>
              <Text>{item.points}</Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
          </View>
        </Swipeable>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  margin: {
    margin: 10
  },
  newsStyle: {
    flex: 1,
    flexDirection: "row",
    margin: 4
  },
  card: {
    padding: 10,
    width: Math.round(Dimensions.get("window").width) / 1.056,
    borderRadius: 20
  },
  score: {
    height: Math.round(Dimensions.get("window").width) / 8.5,
    width: Math.round(Dimensions.get("window").width) / 8.5,
    borderRadius: 50,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 30,
    padding: 30,
    alignSelf: "center"
  },
  icon: {
    margin: 10
  }
});

export default NewsComponent;
