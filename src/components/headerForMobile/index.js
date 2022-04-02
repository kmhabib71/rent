import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Dimensions, Platform } from "react-native";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Octicons } from "@expo/vector-icons";
const HeaderForMobile = () => {
  const windowWidth = Number(Dimensions.get("window").width);
  return (
    <>
      <View
        style={[
          styles.headerWrap,
          { display: windowWidth > 800 ? "none" : "flex" },
        ]}>
        <View style={styles.searchByTextWrap}>
          <Feather name="search" size={24} color="black" />
          <TextInput
            placeholder="Search in Rent.com"
            style={[styles.searchPlaceholder, { width: "100%" }]}
            multiline={false}
          />
        </View>
        <View style={styles.locationCatSearchWrap}>
          <View style={styles.locationSearchWrap}>
            <MaterialIcons name="location-on" size={24} color="black" />
            <Text>Location</Text>
            <Text style={styles.locationSearchText}>New York</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Octicons name="settings" size={24} color="black" />
            <Text style={styles.catText}>Category</Text>
            <Text style={styles.catDynText}>Vehicle</Text>
          </View>
        </View>
      </View>
    </>
  );
};
export default HeaderForMobile;
