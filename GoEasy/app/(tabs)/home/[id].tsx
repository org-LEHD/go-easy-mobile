import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { Review } from "../../../components/Review";
import { Card } from "../../../components/Card";
import { useAdsApi } from "../../../data/useAdsApi";
import { AddType } from "../../../components/Types";

const home = () => {
  const { id } = useSearchParams();
  const { fetchInitialAds } = useAdsApi(id);
  const [adds, setAdds] = useState<AddType[] | null>(null);

  useEffect(() => {
    // Define an async function to fetch and log the initial ads
    const fetchData = async () => {
      try {
        const initialAds = await fetchInitialAds();
        setAdds(initialAds);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the async function to fetch the data
    fetchData();
  }, [fetchInitialAds]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        {adds && (
          <Image
            style={styles.video}
            source={{ uri: adds[0]?.media }}
            resizeMode="cover"
          />
        )}
      </View>
      <View style={styles.row}>
        <View style={styles.headerBox}>
          <Text style={styles.header}>{adds && adds[0]?.title}</Text>
        </View>
      </View>
      <View style={[styles.row, styles.review]}>
        <Review />
      </View>
      <View style={[styles.row, styles.desc]}>
        <Text>{adds && adds[0]?.description}</Text>
      </View>
      <View style={[styles.row, styles.cards]}>
        <Card />
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    backgroundColor: "#fff",
    width: "100%",
    flexBasis: "auto",
    height: 210,
  },
  headerBox: {
    flex: 0,
    alignSelf: "auto",
    paddingTop: 15,
  },
  header: {
    fontSize: 30,
  },
  review: {
    padding: 15,
  },
  desc: {
    paddingHorizontal: 30,
    paddingVertical: 15,
  },
  cards: {
    marginVertical: 15,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
});

export default home;
