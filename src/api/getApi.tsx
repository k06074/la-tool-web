import { API_KEY } from "@@/lib/constants";
import { GetItemsProps } from "@@/types";

export const getItems = async (itemsProps: GetItemsProps): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOSTARK_ENDPOINT}/auctions/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(itemsProps),
    },
  );

  if (response.status === 429) {
    console.log(429);
    return undefined;
  }

  return response.json();
};
