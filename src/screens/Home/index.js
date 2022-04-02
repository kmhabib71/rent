import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  SafeAreaView,
  Platform,
  FlatList,
  View,
  Text,
  Dimensions,
} from "react-native";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { colors } from "../../modal/color";
import { API } from "aws-amplify";
import { getListingByCreatedAt } from "../../graphql/queries";
import HeaderForDesktop from "../../components/headerForDesktop";
import CategoryForDesktop from "../../components/categoryForDesktop";
import MenuDetailsForDesktop from "../../components/menuDetailsForDesktop";
const Home = () => {
  const windowWidth = Number(Dimensions.get("window").width);
  const [newItems, setNewItems] = useState([]);
  const fetchAll = async () => {
    try {
      const itemListByCommonID = await API.graphql({
        query: getListingByCreatedAt,
        variables: { commonID: "1", sortDirection: "DESC" },
        authMode: "AWS_IAM",
      });

      setNewItems(itemListByCommonID.data.getListingByCreatedAt.items);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  const [menuToggle, setMenuToggle] = useState(false);
  return (
    <>
      <HeaderForMobile />
      <HeaderForDesktop setMenuToggle={setMenuToggle} menuToggle={menuToggle} />
      <View style={{ flex: 1, alignItems: "center", position: "relative" }}>
        <View
          style={{
            flex: 1,
            width: windowWidth > 800 ? "80%" : "100%",
            flexDirection: "row",
            justifyContent: "center",
          }}>
          <View
            style={{
              display: windowWidth > 800 ? "flex" : "none",
              flexBasis: "20%",
            }}>
            <CategoryForDesktop />
          </View>
          <FlatList
            style={{ flexBasis: "80%", marginTop: 10 }}
            data={newItems}
            renderItem={({ item }) => <PostItems post={item} />}
          />
        </View>
        <MenuDetailsForDesktop menuToggle={menuToggle} />
      </View>
    </>
  );
};

export default Home;
