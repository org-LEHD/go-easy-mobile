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
        const categoryMappings: Record<string, string> = {
          Church: "Kirke",
          Theater: "Teater",
          Cinema: "Biograf",
        };
        // Check if the category value exists in the mapping
        const updatedCategory = categoryMappings[category] || category;

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
