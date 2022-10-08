import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

import { Header } from "@rneui/themed";

import BoldText from "../components/BoldText";

import app from "../config";
import { signInWithEmailAndPassword, initializeAuth } from "firebase/auth";

const auth = initializeAuth(app);

export default class LoginScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isLoading: false,
    };
  }

  checkTextInput = () => {
    if (!this.state.email.trim() || !this.state.password.trim()) {
      ToastAndroid.show("Please enter your credentials", ToastAndroid.SHORT);
    } else {
      this.setState({ isLoading: true });
      this.login(this.state.email.trim(), this.state.password);
    }
  };

  login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        ToastAndroid.show("Login Successful", ToastAndroid.SHORT);
        this.props.navigation.replace("Tab");
        this.setState({ isLoading: false });
      })
      .catch((error) => {
        ToastAndroid.show(error.message, ToastAndroid.LONG);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="#070707"
          containerStyle={{ paddingVertical: RFValue(25) }}
          centerComponent={{
            text: (
              <BoldText style={{ fontSize: RFValue(30) }}>Dot Rewards</BoldText>
            ),
          }}
        />
        <Modal
          transparent={true}
          animationType={"none"}
          visible={this.state.isLoading}
        >
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={this.state.isLoading} />
            </View>
          </View>
        </Modal>
        <BoldText style={styles.head}>Sign In</BoldText>
        <TextInput
          style={[styles.input, { marginTop: RFValue(40) }]}
          placeholder="Email"
          placeholderTextColor={"#fff"}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor={"#fff"}
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {
            this.setState({ password: text });
          }}
        />
        <TouchableOpacity style={styles.button} onPress={this.checkTextInput}>
          <BoldText style={styles.buttonText}>Login</BoldText>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070707",
  },

  head: {
    fontSize: RFValue(30),
    color: "#fff",
    textAlign: "center",
    marginTop: RFValue(50),
  },

  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },

  activityIndicatorWrapper: {
    backgroundColor: "#000",
    borderColor: "#fff",
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  input: {
    width: "80%",
    height: RFValue(50),
    backgroundColor: "#070707",
    borderRadius: RFValue(10),
    borderWidth: RFValue(3),
    borderColor: "#fff",
    borderBottomWidth: RFValue(5),
    alignSelf: "center",
    marginTop: RFValue(30),
    paddingLeft: RFValue(12),
    justifyContent: "center",
    fontSize: RFValue(13),
    color: "#fff",
  },

  button: {
    width: "60%",
    height: RFValue(60),
    backgroundColor: "#070707",
    borderRadius: RFValue(10),
    borderWidth: RFValue(3),
    borderColor: "#fff",
    borderBottomWidth: RFValue(9),
    borderBottomStartRadius: RFValue(14),
    borderBottomEndRadius: RFValue(14),
    alignSelf: "center",
    marginTop: RFValue(30),
    justifyContent: "center",
  },

  buttonText: {
    fontSize: RFValue(14),
    textAlign: "center",
  },
});
