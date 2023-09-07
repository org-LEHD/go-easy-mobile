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
  Keyboard,
} from "react-native";
import { IconProps, SearchBar } from "react-native-elements";
import { SearchBarBaseProps } from "react-native-elements/dist/searchbar/SearchBar";
import { SVGIcons } from "./SVG-Icons/Svg";
import { MapContext } from "../context/mapContextProvider";
import { MarkerType, PoiType } from "./Types";
import { usePoiApi } from "../data/usePoiApi";

const SafeSearchBar = SearchBar as unknown as React.FC<SearchBarBaseProps>;

export const SearchBarFilter = ({ handleOnSearchSelect }: any) => {
  const { fetchInitialPoi } = usePoiApi();
  const { initialMarkersContext, isPoiContext, setIsPoiContext } =
    useContext(MapContext);

  const [poi, setPoi] = useState<PoiType[] | null>(null);
  const [isPoi, setIsPoi] = useState<boolean>(false);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [filteredMarkersSource, setFilteredDataSource] = useState<MarkerType[]>(
    initialMarkersContext as MarkerType[]
  );
  const [filteredPoiSource, setFilteredPoiSource] = useState<MarkerType[]>([]);

  useEffect(() => {
    // Define an async function to fetch and log the initial ads
    const fetchData = async () => {
      try {
        const initialPoi = await fetchInitialPoi();
        setPoi(initialPoi);
      } catch (error) {
        console.error(error);
      }
    };
    // Call the async function to fetch the data
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredPoiSource(poi as MarkerType[]);
  }, [poi]);

  useEffect(() => {
    isPoi && setIsPoiContext(true);
    isSearch && setIsPoiContext(false);
  }, [isPoi, isSearch]);

  const searchFilterFunction = (text: string) => {
    setIsSearch(false);
    if (text.length >= 1 && !isPoi) {
      setIsSearch(true);
    }
    if (text && isPoi) {
      const newData = poi?.filter(function (item: any) {
        const itemData = item.title
          ? item.title.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return itemData.includes(textData);
      });

      newData && setFilteredDataSource(newData as any);
      setSearch(text);
    } else {
      const newData = initialMarkersContext?.filter(function (
        item: MarkerType
      ) {
        const itemTitle = item.title
          ? item.title.toLowerCase()
          : "".toLowerCase();
        const itemCategory = item.category
          ? item.category.toLowerCase()
          : "".toLowerCase();

        const textData = text.toLowerCase();

        const matchesTitle = itemTitle.includes(textData);
        const matchesCategory = itemCategory.includes(textData);

        return matchesTitle || matchesCategory;
      });

      newData && setFilteredDataSource(newData);
      setSearch(text);
    }
    if (!text) {
      Keyboard.dismiss(); // Dismiss the keyboard only if there is no text
    }
  };

  const ItemView = ({ item }: any) => {
    const [number, name, area, city] = item.address?.split(",") || [];
    return (
      // Flat List Item
      <View style={styles.container}>
        <TouchableOpacity style={styles.row} onPress={() => getItem(item)}>
          <View style={styles.screenIcon}>
            {isPoi && <SVGIcons.Poi color={"#888888"} />}
            {isSearch && <SVGIcons.Clock color={"#888888"} scale={1.2} />}
          </View>
          <View style={styles.textContent}>
            <Text style={styles.title}>{item?.title}</Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.address}
            >{`${name ?? ""} ${number ?? ""}${city ? ", " + city : ""}`}</Text>
          </View>
        </TouchableOpacity>
      </View>
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
    handleOnSearchSelect(item);
    handleEndSearch();
  };

  const handleEndSearch = () => {
    isPoi && setIsPoi(false);
    isSearch && setIsSearch(false);
    searchFilterFunction("");
    setSearch("");
    Keyboard.dismiss();
  };

  const dataSource = isPoi
    ? filteredPoiSource
    : isSearch
    ? filteredMarkersSource
    : [];

  return (
    <>
      <View style={styles.searchbar}>
        <SafeSearchBar
          leftIconContainerStyle={{ display: "none" }}
          onChangeText={(text: string) => searchFilterFunction(text)}
          onClear={() => searchFilterFunction("")}
          placeholder="Søgning..."
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
            marginStart: 40,
            marginEnd: isSearch ? 0 : 40,
          }}
          clearIcon={
            {
              size: 24,
              color: "#AAAAAA",
              style: { display: search ? "flex" : "none" },
            } as IconProps
          }
        />
        <View style={styles.leftContainer}>
          {isPoi || isSearch ? (
            <TouchableOpacity onPress={() => handleEndSearch()}>
              <SVGIcons.ArrowLight />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity>
              <SVGIcons.Search />
            </TouchableOpacity>
          )}
        </View>
        {!isSearch ? (
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={() => setIsPoi(true)}>
              <SVGIcons.Poi />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {isPoi || isSearch ? (
        <View style={styles.flatlist}>
          {dataSource.length ? (
            <FlatList
              data={dataSource}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              ListHeaderComponent={() => (
                <View style={styles.flatListContainer}>
                  <Text style={styles.flatListResult}>Resultater</Text>
                </View>
              )}
            />
          ) : (
            <Text style={styles.flatListNoResults}>
              Ingen Resultater fundet
            </Text>
          )}
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
  flatListContainer: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  flatListResult: { width: "100%", marginBottom: 10 },
  flatListNoResults: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  container: {
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  deletebox: {
    backgroundColor: "#FE0045",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 60,
    marginBottom: 20,
    marginRight: 20,
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    height: 60,
    marginBottom: 20,
    borderBottomColor: "#DEDEDE",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  screenIcon: {
    backgroundColor: "#E8E9E9",
    width: 40,
    height: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 3,
  },
  address: {
    fontSize: 10,
    marginBottom: 3,
    marginStart: -2,
  },
});
