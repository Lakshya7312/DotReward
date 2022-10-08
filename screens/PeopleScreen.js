import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class PeopleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>People Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
