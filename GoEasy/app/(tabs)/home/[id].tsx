import { ScrollView, View, Text, StyleSheet, Image } from "react-native";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { useContext, useRef, useState } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { MapContext } from "../../../context/mapContextProvider";
import { Review } from "../../../components/Review";
import { Card } from "../../../components/Card";

const home = () => {
  const { id } = useSearchParams();
  const { markersContext } = useContext(MapContext);
  const video = useRef(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  const selectedMarker = markersContext?.find((marker: { id: number }) => marker.id === parseInt(id as string, 10));
 
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
      {selectedMarker?.mediaEnum === "Image" && (
          <Image
            style={styles.video}
            source={{ uri: selectedMarker.media }}
            resizeMode="contain"
          />
        )}
        {selectedMarker?.mediaEnum === "Video" && (
          <Video
            ref={video}
            style={styles.video}
            source={{ uri: selectedMarker.media }}
            resizeMode={"contain" as ResizeMode | undefined}
            isLooping
            onPlaybackStatusUpdate={(newStatus) => setStatus(newStatus)}
            shouldPlay
          />
        )}
        {selectedMarker?.mediaEnum === "Gif" && (
          <Image
            style={styles.video}
            source={{ uri: selectedMarker.media }}
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.row}>
        <View style={styles.headerBox}>
          <Text style={styles.header}>
            {selectedMarker && selectedMarker.title}
          </Text>
        </View>
      </View>
      <View style={[styles.row, styles.review]}>
        <Review />
      </View>
      <View style={[styles.row, styles.desc]}>
        <Text>
          Vi har stort udsalg på frokostpizza og burgerer. Vores familie menu er
          et must try. Kom forbi når du har lyst.
        </Text>
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