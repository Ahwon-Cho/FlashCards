import {StyleSheet, View} from "react-native";
import React from "react";


const Separator = () => (
  <View style={styles.separator} />
);
export default Separator
const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});
