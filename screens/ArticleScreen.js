import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class ArticleScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Article Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
