import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { WIDTH } from "../constants/constants";
export const Card = () => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.image}
        source={require("../assets/small_image.png")}
      />
      <View style={styles.info}>
        <Text style={styles.product}>Produktnavn</Text>
        <Text style={styles.desc}>Kort beskrivelse</Text>
        <Text style={styles.price}>Kr. 75.-</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexBasis: (WIDTH - 50) / 2,
    borderColor: "#CDD4D9",
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
  },
  image: {
    width: "100%",
    borderRadius: 4,
  },
  info: {
    paddingVertical: 5,
  },
  product: {
    fontWeight: "500",
  },
  desc: {
    paddingVertical: 5,
  },
  price: {
    fontWeight: "800",
  },
});
