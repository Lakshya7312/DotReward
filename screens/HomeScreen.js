import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import MyHeader from "../components/MyHeader";

import app from "../config";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  where,
  query,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

const auth = getAuth(app);
const db = getFirestore(app);

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: auth.currentUser.email,
      name: "",
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MyHeader title={"Hello, "} />
        <Text>Home Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
