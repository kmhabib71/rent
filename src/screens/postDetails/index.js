import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { colors } from "../../modal/color";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderForDesktop from "../../components/headerForDesktop";
import MenuDetailsForDesktop from "../../components/menuDetailsForDesktop";
const PostDetails = () => {
  const windowWidth = Number(Dimensions.get("window").width);
  const route = useRoute();
  const navigation = useNavigation();
  console.log("Postdetails title is: ", route.params.postInfo.title);
  const [images, setimages] = useState(
    JSON.parse(route.params.postInfo.images)
  );
  const [userEmail, setUserEmail] = useState(route.params.postInfo.owner);
  const substrEmail = userEmail.substr(0, userEmail.indexOf("@"));
  // setUserEmail(substrEmail);
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <HeaderForDesktop setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: windowWidth > 800 ? "80%" : "100%",
            backgroundColor:
              windowWidth > 800 ? colors.white : colors.backgroundColor,
          }}>
          <ScrollView horizontal={true}>
            {images &&
              images.map((data, index) => (
                <Image
                  source={{
                    uri:
                      "https://dnezpuwttqdfg.cloudfront.net/fit-in/500x500/public/" +
                      images[index].imageUri,
                  }}
                  style={{
                    height: 320,
                    width: 380,
                    marginRight: 10,
                  }}
                  key={index}
                />
              ))}
          </ScrollView>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 30,
              fontWeight: "bold",
              marginRight: 10,
              marginTop: 30,
              color: colors.secondary,
            }}>
            {route.params.postInfo.title}
          </Text>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
              marginBottom: 20,
            }}>
            <View
              style={{
                backgroundColor: colors.secondary,
                height: 50,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 50,
                paddingRight: 5,
                marginRight: 10,
              }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: colors.primary,
                }}>
                {" "}
                {substrEmail.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View>
              <Text style={{ color: colors.grey }}>Owned by</Text>
              <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                {substrEmail}
              </Text>
            </View>
          </View>
          <View
            style={{
              margin: 10,
              flexDirection: "row",
              justifyContent: "space-around",
              borderTopWidth: 1,
              borderTopColor: "lightgrey",
              borderBottomWidth: 1,
              borderBottomColor: "lightgrey",
              paddingVertical: 20,
            }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.secondary,
                }}>
                $ {route.params.postInfo.rentValue}
              </Text>
              <Text style={{ color: colors.grey }}>A day</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.secondary,
                }}>
                $ {route.params.postInfo.rentValue * 7}
              </Text>
              <Text style={{ color: colors.grey }}>A week</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: colors.secondary,
                }}>
                $ {route.params.postInfo.rentValue * 30}
              </Text>
              <Text style={{ color: colors.grey }}>A month</Text>
            </View>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ color: colors.grey }}>
              Preferred Meetup Location
            </Text>
            <Text style={{ color: colors.secondary }}>
              {route.params.postInfo.locationName}
            </Text>
          </View>
          <View style={{ margin: 10 }}>
            <Text style={{ color: colors.grey }}>Description</Text>
            <Text style={{ color: colors.secondary }}>
              {route.params.postInfo.description}
            </Text>
          </View>
        </View>
      </View>
      <MenuDetailsForDesktop menuToggle={menuToggle} />
    </>
  );
};

export default PostDetails;
