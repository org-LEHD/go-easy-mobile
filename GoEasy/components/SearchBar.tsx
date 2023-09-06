import React, { useState, useContext, useRef } from 'react';
import { IconProps, SearchBar } from 'react-native-elements';
import { StyleSheet, Text, Animated, View, Pressable } from "react-native";
import { Marker } from "react-native-maps";
import { MapContext } from "../context/mapContextProvider";
import { Favorites } from "./Favorites";
import { MarkerType } from './Types';
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';

const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;
export const SearchBarWithIcon = ({ handleOnSearchSelect, active }: any) => {

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchFieldSelected, setSearchFieldSelected] = useState(false);
  const [searchChoose, setSearchChoose] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(active);
  const { initialMarkersContext } = useContext(MapContext);

  if (initialMarkersContext === null) {
    // You can render a loading indicator or placeholder here if needed
    return null;
  }

  const filteredSearch = initialMarkersContext.filter((marker: MarkerType) => {
    return (
      marker.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      marker.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleButtonPress = (marker: MarkerType) => {
    console.log(marker.id)
    setIsSearchActive(false)
    handleOnSearchSelect(marker)
  };

  return (
    <>
      <SafeSearchBar
        
        placeholder={"Search"}
        onChangeText={(abc: any) => setSearchQuery(abc)}
        value={searchQuery}
        platform='default'
        containerStyle={{
          backgroundColor: "transparent",
          borderBottomColor: "transparent",
          borderTopColor: "transparent",
          marginTop: '5%',
          zIndex:3
        }}
        inputContainerStyle={{ backgroundColor: "#EDEDED", borderRadius: 10 }}
        searchIcon={{ size: 24, color: "#666" } as IconProps}
        onFocus={() => setSearchFieldSelected(true)}
        onBlur={() => setSearchFieldSelected(false)}
        clearIcon={{ size: 24, color: "#666" } as IconProps}
      />
      {searchFieldSelected && isSearchActive && (
        <View style={styles.filteredSearchContainer}>
          {filteredSearch.map((marker: any) => (
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
      {searchChoose ? (
          <Favorites />
        ) : null}
    </>
  );
};


const styles = StyleSheet.create({
  filteredSearchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    zIndex: 2,
  },
  FilteredItemsStart: {
    top: '25%',
  },
  buttons: {
    justifyContent: 'center',
    paddingVertical: 25,
    marginLeft: '20%',
    borderBottomWidth: 3,
    borderBottomColor: '#e6e6e6',
    backgroundColor: 'white',
  },
  titleText: {
    fontSize: 20
  },
  markerWrap: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: 50,
    height: 50,
  },
});