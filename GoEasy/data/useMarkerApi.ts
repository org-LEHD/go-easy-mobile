export const useMarkerApi = () => {
  const url = "https://web-go-easy.vercel.app/api/trpc/location.getAll";
  const fetchInitialMarkers = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const responseData = json.result?.data?.json || json;
      const initialMarkers = responseData.map((item: any) => {
        const {
          id,
          name,
          address,
          description,
          category,
          summary,
          phone,
          lat,
          long,
          website,
          thumbnail,
        } = item;

        // Translate category in mappings
        const categoryMappings: Record<string, string> = {
          Museum: "Museum",
        };
        // Check if the category value exists in the mapping
        const updatedCategory = categoryMappings[category] || category;

        return {
          id,
          title: name,
          address,
          category: updatedCategory,
          phone,
          description,
          summary,
          coords: {
            latitude: lat,
            longitude: long,
          },
          website,
          thumbnail,
          distance: 0,
        };
      });
      return initialMarkers;
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchInitialMarkers };
};
