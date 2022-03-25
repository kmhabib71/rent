import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  Pressable,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { withAuthenticator } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../modal/color";
import { Octicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useRoute } from "@react-navigation/native";
const Listing = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState({ catID: 0, catName: "Category" });
  const [Location, setLocation] = useState({ locID: 0, locName: "Location" });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rentValue, setRentValue] = useState("");

  Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log("user id is: ", user.attributes.sub);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  const [imageData, setImageData] = useState([]);
  const route = useRoute();
  useEffect(() => {
    if (!route.params) {
      console.log("There is no data in route");
    } else {
      if (route.params.imageData !== undefined) {
        setImageData(route.params.imageData);
      } else if (route.params.catID !== undefined) {
        setCategory(route.params);
      } else if (route.params.locID !== undefined) {
        setLocation(route.params);
      }
    }
  });

  // Auth.signOut();
  return (
    <View style={{ margin: 10 }}>
      <View>
        <Text style={{ marginTop: 10 }}>Upload images [Max 5 photos]</Text>
        <Pressable
          style={{
            backgroundColor: colors.white,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
            height: 150,
            width: 150,
            borderWidth: 1,
            borderStyle: "dashed",
            borderRadius: 30,
          }}
          onPress={() => {
            navigation.navigate("SelectPhoto");
          }}>
          <AntDesign name="pluscircle" size={24} color="black" />
        </Pressable>
        <View>
          <ScrollView horizontal={true}>
            {imageData &&
              imageData.map((component, index) => (
                <Image
                  key={component.id}
                  source={{ uri: component.uri }}
                  style={{
                    height: 100,
                    width: 100,
                    marginBottom: 20,
                    marginTop: -5,
                    marginRight: 5,
                  }}
                />
              ))}
          </ScrollView>
        </View>
      </View>
      <Pressable
        style={styles.catStyle}
        onPress={() => {
          navigation.navigate("SelectCategory");
        }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="settings" size={24} color="black" />
          <Text
            style={{ fontSize: 16, color: colors.secondary, marginLeft: 5 }}>
            {category.catName}
          </Text>
        </View>
        <AntDesign name="right" size={22} color={colors.secondary} />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("SelectLocation");
        }}
        style={styles.catStyle}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="map-marker"
            size={24}
            color={colors.secondary}
          />
          <Text
            style={{ fontSize: 16, color: colors.secondary, marginLeft: 5 }}>
            {Location.locName}
          </Text>
        </View>
        <AntDesign name="right" size={22} color={colors.secondary} />
      </Pressable>

      <View style={styles.inputTextStyle}>
        <MaterialIcons name="title" size={24} color={colors.secondary} />
        <TextInput
          placeholder="Adv Title"
          style={{ width: "100%" }}
          onChangeText={(text) => setTitle(text)}
        />
      </View>
      <View style={styles.inputTextStyle}>
        <MaterialIcons name="description" size={24} color={colors.secondary} />
        <TextInput
          placeholder="Write a description"
          style={{ marginLeft: 5, width: "100%" }}
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          numberOfLines={3}
        />
      </View>
      <View style={[styles.inputTextStyle, { width: "50%" }]}>
        <FontAwesome name="dollar" size={24} color={colors.secondary} />
        <TextInput
          placeholder="Add a value"
          style={{ marginLeft: 5, width: "100%" }}
          onChangeText={(text) => setRentValue(text)}
          keyboardType="numeric"
        />
      </View>
      <View
        style={{
          margin: 10,
          borderRadius: 30,
          backgroundColor: colors.secondary,
          alignItems: "center",
          paddingLeft: 20,
          // marginTop: 150,
          elevation: 5,
        }}>
        <Text
          style={{
            color: colors.white,
            paddingVertical: 12,
            fontSize: 14.5,
            fontWeight: "bold",
          }}>
          POST ADV
        </Text>
      </View>
    </View>
  );
};

export default withAuthenticator(Listing);
