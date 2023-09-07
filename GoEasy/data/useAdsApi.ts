export const useAdsApi = (id: any) => {
  const url = `https://web-go-easy.vercel.app/api/trpc/advertisement.getAllByLocationId?batch=1&input={"0":{"json":${id}}}`;
  const fetchInitialAds = async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const responseData = json[0].result?.data?.json || json;
      const initialAds = responseData.map((item: any) => {
        const { id, locationId, title, media, description } = item;

        // Perform any additional transformations or operations on the item here

        return {
          id,
          locationId,
          title,
          media,
          description,
        };
      });
      return initialAds;
    } catch (error) {
      console.error(error);
    }
  };
  return { fetchInitialAds };
};
