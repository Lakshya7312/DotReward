import React from "react";
import { Text, StyleSheet } from "react-native";

import * as Font from "expo-font";

let customFonts = {
  'GilroyBold': require("../assets/fonts/Gilroy-ExtraBold.otf"),
};

export default class MyBoldText extends React.Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  render() {
    if (!this.state.fontsLoaded) {
      return null;
    }
    return (
      <Text style={[styles.text, this.props.style]}>{this.props.children}</Text>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "GilroyBold",
    color: "#000",
  },
});
