import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export const BottomSheetMarkerDesc = () => {
  return (
    <>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <Image source={require("../../assets/small_image.png")} />
        </View>
        <View style={styles.rightCol}>
          <Text style={styles.header}>
            Kom ind og prøv vores menu. Det er den bedste nogensinde
          </Text>
          <Text ellipsizeMode="tail" numberOfLines={3} style={styles.body}>
            Vi har stort udsalg på frokostpizza og burgerer. Vores familie menu
            er et must try. Kom forbi når du har lyst.
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flex: 2,
    gap: 25,
    marginTop: 15,
  },
  leftCol: {
    flexBasis: 100,
  },
  rightCol: {
    flex: 1,
    alignItems: "flex-start",
  },

  header: {
    fontSize: 16,
    lineHeight: 16,
    fontWeight: "500",
    color: "#666",
    marginBottom: 10,
  },
  body: {
    fontSize: 13,
    color: "#666",
  },
});
