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
          category,
          lat,
          long,
          thumbnail,
        } = item;

        // Perform any additional transformations or operations on the item here

        return {
          id,
          title: name,
          address,
          category,
          description,
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
