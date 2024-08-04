import { API_KEYS } from "@@/lib/constants";
import { GetItemsProps } from "@@/types";

export const getItems = async (
  itemsProps: GetItemsProps,
  page: number,
  currentKey: number,
): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOSTARK_ENDPOINT}/auctions/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEYS[currentKey]}`,
      },
      body: JSON.stringify({
        ...itemsProps,
        PageNo: page,
      }),
    },
  );

  if (response.status === 429) {
    return undefined;
  }

  return response.json();
};
