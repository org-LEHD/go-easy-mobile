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

        // Perform any additional transformations or operations on the item here

        return {
          id,
          title: name,
          address,
          category,
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
