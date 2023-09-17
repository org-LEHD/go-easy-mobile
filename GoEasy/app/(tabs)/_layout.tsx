import React, { useContext, useEffect, useState } from "react";
import { Tabs } from "expo-router";
import { MapContext } from "../../context/mapContextProvider";
import { useSearchParams } from "expo-router";

import { SVGIcons } from "../../components/SVG-Icons/Svg";
import { Alert, Linking } from "react-native";
import { useFavoriteAsyncStorage } from "../../hooks/useFavoriteAsyncStorage";
import { MarkerType } from "../../components/Types";

const TabsLayout = () => {
  const { markersContext, initialMarkersContext } = useContext(MapContext);
  const { id } = useSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<MarkerType>();
  const {
    getSingleStorageFavorite,
    setStorageFavorites,
    removeStorageFavorite,
  } = useFavoriteAsyncStorage();

  useEffect(() => {
    const fetchFavorite = async () => {
      const singleFavorite = await getSingleStorageFavorite(
        Number(id),
        markersContext as MarkerType[]
      );
      if (singleFavorite) setIsFavorite(true);
      setSelectedMarker(initialMarkersContext?.find((marker) => marker.id === Number(id)));
    };
    fetchFavorite();
  }, []);

  const handleFavorites = async () => {
    try {
      if (isFavorite) {
        await removeStorageFavorite(Number(id));
        setIsFavorite(false);
      } else {
        await setStorageFavorites(Number(id), markersContext as MarkerType[]);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error handling favorites:", error);
    }
  };

  const handleButtonPhone = () => {
    Linking.openURL(`tel:${selectedMarker?.phone}`);
  };
  const handleButtonWeb = () => {
    Linking.openURL(selectedMarker?.website ?? "https://Google.dk/");
  };

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { paddingTop: 20 },
      }}
    >
      <Tabs.Screen
        name="home/[id]"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.Home />;
          },
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return isFavorite ? <SVGIcons.Heart /> : <SVGIcons.HeartOutline />;
          },
        }}
        listeners={{
          tabPress: (e: { preventDefault: () => void }) => {
            e.preventDefault();
            handleFavorites();
          },
        }}
      />
      <Tabs.Screen
        name="web"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.Web />;
          },
        }}
        listeners={{
          tabPress: (e: { preventDefault: () => void }) => {
            e.preventDefault();
            handleButtonWeb();
          },
        }}
      />
      <Tabs.Screen
        name="phone"
        options={{
          headerTitle: "",
          headerShown: false,
          tabBarLabel: "",
          tabBarIcon(props) {
            return <SVGIcons.Phone />;
          },
        }}
        listeners={{
          tabPress: (e: { preventDefault: () => void }) => {
            e.preventDefault();
            Alert.alert("Call:", `${selectedMarker?.phone}`, [
              {
                text: "Cancel",
                style: "default",
              },
              {
                text: "OK",
                onPress: handleButtonPhone,
                style: "default",
              },
            ]);
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
