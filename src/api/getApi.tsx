import { GetItemsProps } from "@@/types";

export const getItems = async (
  itemsProps: GetItemsProps,
  page: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const localKeys = localStorage.getItem("laApiKeys");
  const apiKeys: string[] = localKeys
    ? JSON.parse(localKeys).filter((key: string) => key)
    : [];
  if (apiKeys.length === 0) {
    throw new Error("No API keys found");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOSTARK_ENDPOINT}/auctions/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKeys[page % apiKeys.length]}`,
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
