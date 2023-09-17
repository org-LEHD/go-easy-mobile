import React, { useState, useContext, useRef, useEffect } from "react";
import { IconProps, SearchBar } from "react-native-elements";
import {
  StyleSheet,
  Text,
  Animated,
  View,
  Pressable,
  Keyboard,
} from "react-native";
import { Marker } from "react-native-maps";
import { MapContext } from "../context/mapContextProvider";
import { Favorites } from "./Favorites";
import { MarkerType } from "./Types";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";

const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;
export const SearchBarWithIcon = ({ handleOnSearchSelect }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFieldSelected, setSearchFieldSelected] = useState(false);
  const [searchChoose, setSearchChoose] = useState(false);
  const { initialMarkersContext } = useContext(MapContext);

  // if (initialMarkersContext === null) {
  //   // You can render a loading indicator or placeholder here if needed
  //   return null;
  // }

  useEffect(() => {
    if (searchQuery.length > 2) {
      setSearchFieldSelected(true);
    } else {
      setSearchFieldSelected(false);
    }
  }, [searchQuery]);

  const filteredSearch = initialMarkersContext?.filter((marker: MarkerType) => {
    return (
      marker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marker.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleButtonPress = (marker: MarkerType) => {
    setSearchFieldSelected(false);
    Keyboard.dismiss();
    setSearchQuery("");
    handleOnSearchSelect(marker);
  };

  return (
    <>
      <SafeSearchBar
        placeholder={"Search"}
        onChangeText={(abc: any) => setSearchQuery(abc)}
        value={searchQuery}
        platform="default"
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          marginTop: "5%",
          zIndex: 3,
        }}
        inputContainerStyle={{ backgroundColor: "#EDEDED", borderRadius: 10 }}
        searchIcon={{ size: 24, color: "#666" } as IconProps}
        clearIcon={{ size: 24, color: "#666" } as IconProps}
      />
      {searchFieldSelected && (
        <View style={styles.filteredSearchContainer}>
          {filteredSearch?.map((marker: any) => (
            <View key={marker.id} style={styles.FilteredItemsStart}>
              <Pressable
                key={marker.id}
                onPress={() => handleButtonPress(marker)}
                style={styles.buttons}
              >
                <Text style={styles.titleText}>{marker.title}</Text>
                <Text>{marker.category}</Text>
              </Pressable>
            </View>
          ))}
        </View>
      )}
      {searchChoose ? <Favorites /> : null}
    </>
  );
};

const styles = StyleSheet.create({
  filteredSearchContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    zIndex: 2,
  },
  FilteredItemsStart: {
    top: "25%",
  },
  buttons: {
    justifyContent: "center",
    paddingVertical: 25,
    marginLeft: "20%",
    borderBottomWidth: 3,
    borderBottomColor: "#e6e6e6",
    backgroundColor: "white",
  },
  titleText: {
    fontSize: 20,
  },
  markerWrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 50,
    height: 50,
  },
  scrollView: {
    flex: 1,
    top: 130,
    marginBottom: 135,
  },
});
