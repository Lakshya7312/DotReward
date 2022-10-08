import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default class RewardScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Rewads Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
