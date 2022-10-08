import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
  ToastAndroid,
} from "react-native";

import { Header, Avatar } from "@rneui/themed";

import { RFValue } from "react-native-responsive-fontsize";

import app from "../config";
import { getAuth } from "firebase/auth";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

import BoldText from "./BoldText";
import AppText from "./AppText";

const auth = getAuth(app);
const storage = getStorage(app);

export default class MyHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      email: auth.currentUser.email,
      image: "https://avatars.dicebear.com/api/micah/male4.png",
      isModalVisible: false,
    };
  }

  componentDidMount() {
    this.fetchImage(this.state.email);
  }

  selectPicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      ToastAndroid.show("Loading...\nThis may take a while", ToastAndroid.LONG);
      this.uploadImage(result.uri, this.state.email);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    const storageRef = ref(storage, "user_profiles/" + imageName);

    return uploadBytes(storageRef, blob).then((snapshot) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = ref(storage, "user_profiles/" + imageName);
    getDownloadURL(storageRef)
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({
          image: "https://avatars.dicebear.com/api/micah/male4.png",
        });
      });
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isModalVisible}
          onRequestClose={() => {
            this.setState({ isModalVisible: false });
          }}
        >
          <View style={styles.modalView}>
            <BoldText style={styles.modalHead}>
              Choose a profile picture
            </BoldText>
            <Avatar
              containerStyle={{ marginTop: RFValue(18) }}
              size={"xlarge"}
              rounded
              source={{ uri: this.state.image }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.selectPicture();
              }}
            >
              <AppText style={styles.buttonText}>Open Gallery</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { width: "40%", height: RFValue(50) }]}
              onPress={() => {
                this.setState({ isModalVisible: false });
              }}
            >
              <AppText style={styles.buttonText}>Go Back</AppText>
            </TouchableOpacity>
          </View>
        </Modal>
        <Header
          backgroundColor="#fff"
          containerStyle={{
            paddingVertical: RFValue(20),
            borderBottomWidth: 0,
          }}
          leftComponent={{
            text: <BoldText style={styles.text}>{this.props.title}</BoldText>,
            style: styles.text,
          }}
          rightComponent={
            <TouchableOpacity
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}
            >
              <Avatar
                source={{ uri: this.state.image }}
                containerStyle={{ marginRight: RFValue(15), borderRadius: 20 }}
                size="small"
              />
            </TouchableOpacity>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: RFValue(20),
    marginLeft: RFValue(10),
  },

  modalView: {
    padding: RFValue(35),
    alignItems: "center",
    backgroundColor: "#070707",
    height: "100%",
    width: "100%",
  },

  modalHead: {
    fontSize: RFValue(15),
    alignSelf: "center",
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
