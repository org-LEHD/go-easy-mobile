import React, { useState, useContext, useRef, useEffect } from 'react';
import { IconProps, SearchBar } from 'react-native-elements';
import { StyleSheet, Text, Animated, View, Pressable, Keyboard } from "react-native";
import { Marker } from "react-native-maps";
import { MapContext } from "../context/mapContextProvider";
import { Favorites } from "./Favorites";
import { MarkerType } from './Types';
import { SearchBarBaseProps } from 'react-native-elements/dist/searchbar/SearchBar';

const SafeSearchBar = (SearchBar as unknown) as React.FC<SearchBarBaseProps>;
export const Test = () => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchFieldSelected, setSearchFieldSelected] = useState(false);
    const [searchChoose, setSearchChoose] = useState(false);
    const { initialMarkersContext } = useContext(MapContext);

    useEffect(() => {
        setSearchFieldSelected(searchQuery.length > 2)
    }, [])

    return(
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
        clearIcon={{ size: 24, color: "#666" } as IconProps}
      />
        </>
    )
}