// Searching using Search Bar Filter in React Native List View
// https://aboutreact.com/react-native-search-bar-filter-on-listview/

// import React in our code
import React, { useState, useEffect, useContext } from "react";

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { IconProps, SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";
import { SVGIcons } from "./SVG-Icons/Svg";
import { MapContext } from "../context/mapContextProvider";
import { MarkerType } from "./Types";

const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

export const SearchBarFilter = () => {
  const { initialMarkersContext } = useContext(MapContext);
  const [poiSelected, setPoiSelected] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState<MarkerType[]>(
    initialMarkersContext as MarkerType[]
  );

  useEffect(() => {
    setFilteredDataSource(initialMarkersContext as MarkerType[]);
  }, [initialMarkersContext]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = initialMarkersContext?.filter(function (
        item: MarkerType
      ) {
        const itemData = item.title
          ? item.title.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });

      newData && setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(filteredDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }: any) => {
    return (
      // Flat List Item
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.title}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "transparent",
        }}
      />
    );
  };

  const getItem = (item: any) => {
    // Function for click on an item
    alert("Id : " + item.id + " Title : " + item.title);
  };

  return (
    <>
      <View style={styles.searchbar}>
        <SafeSearchBar
          leftIconContainerStyle={{ display: "none" }}
          onChangeText={(text: string) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction("")}
          placeholder="Type Here..."
          value={search}
          platform={"default"}
          containerStyle={{
            flex: 1,
            backgroundColor: "transparent",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            padding: 0,
          }}
          inputContainerStyle={{
            backgroundColor: "transparent",
            marginHorizontal: 50,
          }}
          clearIcon={{ size: 24, color: "#AAAAAA" } as IconProps}
        />
        <View style={styles.leftContainer}>
          {poiSelected ? (
            <TouchableOpacity onPress={() => setPoiSelected(false)}>
              <SVGIcons.ArrowLight />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <SVGIcons.Search />
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.rightContainer}>
          <TouchableOpacity onPress={() => setPoiSelected(true)}>
            <SVGIcons.Poi />
          </TouchableOpacity>
        </View>
      </View>
      {poiSelected ? (
        <View style={styles.flatlist}>
          <FlatList
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  clearIcon: { transform: [{ scale: 1.2 }] },
  searchbar: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderColor: "#CDD4D9",
    borderWidth: 1,
    borderRadius: 6,
    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    zIndex: 3,
    marginTop: "5%",
  },
  leftContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    borderRadius: 6,
    width: 40,
  },
  rightContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    borderRadius: 6,
    width: 50,
    backgroundColor: "#0064fe",
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,

    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  rightIcon: {
    flex: 0,
    alignItems: "center",
    justifyContent: "center",
    flexBasis: 48,
    backgroundColor: "blue",
    borderRadius: 6,
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,

    shadowColor: "rgba(0, 0, 0, 0.3)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  flatlist: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 2,
    paddingTop: 120,
    paddingHorizontal: 20,
  },

  itemStyle: {
    marginTop: 10,
    padding: 10,
  },
});
