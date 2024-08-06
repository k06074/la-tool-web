import { GetItemsProps } from "@@/types";

export const getItems = async (
  itemsProps: GetItemsProps,
  page: number,
  limit?: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const localKeys = localStorage.getItem("laApiKeys");
  if (!localKeys) {
    throw new Error("No API keys found");
  }
  const apiKeys: string[] = JSON.parse(localKeys).filter((key: string) => key);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOSTARK_ENDPOINT}/auctions/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKeys[page % Math.min(apiKeys.length, limit ?? 2)]}`,
      },
      body: JSON.stringify({
        ...itemsProps,
        PageNo: page,
      }),
    },
  );

  if (response.status === 429) {
    throw new Error("Rate limit exceeded");
  }

  return response.json();
};
