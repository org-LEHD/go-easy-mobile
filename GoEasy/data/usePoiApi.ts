export const usePoiApi = () => {
  const url = `https://web-go-easy.vercel.app/api/trpc/attraction.getAll`;
  const fetchInitialPoi = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const responseData = json.result?.data?.json || json;
      const initialPoi = responseData.map((item: any) => {
        const {
          id,
          name,
          address,
          description,
          summary,
          category,
          lat,
          long,
          thumbnail,
        } = item;

        // Translate category in mappings
        const categoryMappings: Record<string, string | any> = {
          Park: {
            name: "Park",
            url: require("../assets/images/icon_park.png"),
          },
          Church: {
            name: "Kirke",
            url: require("../assets/images/icon_church.png"),
          },
          Theater: {
            name: "Teater",
            url: require("../assets/images/icon_theater.png"),
          },
          Cinema: {
            name: "Biograf",
            url: require("../assets/images/icon_cinema.png"),
          },
          Castle: {
            name: "Slot",
            url: require("../assets/images/icon_castle.png"),
          },
          // Attraction: {
          //   name: "Seværdighed",
          //   url: require("../assets/images/icon_default.png"),
          // },
        };
        // Check if the category value exists in the mapping
        //const updatedCategory = categoryMappings[category] || category;
        const updatedCategory = categoryMappings[category] ?? {
          name: [category],
          url: require("../assets/images/icon_default.png"),
        };

        return {
          id,
          title: name,
          address,
          category: updatedCategory,
          description,
          summary,
          coords: {
            latitude: lat,
            longitude: long,
          },
          thumbnail,
        };
      });
      return initialPoi;
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchInitialPoi };
};
