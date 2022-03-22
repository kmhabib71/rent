import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import PostItems from "../../components/postItems";
import HeaderForMobile from "../../components/headerForMobile";
import { colors } from "../../modal/color";
const Home = () => {
  return (
    <>
      <HeaderForMobile />
      <PostItems />
    </>
  );
};

export default Home;
