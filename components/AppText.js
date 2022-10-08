import React from "react";
import { Text, StyleSheet } from "react-native";

import * as Font from "expo-font";

let customFonts = {
  'Gilroy': require("../assets/fonts/Gilroy-Light.otf"),
};

export default class AppText extends React.Component {
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
    fontFamily: "Gilroy",
    color: "#000",
  },
});
