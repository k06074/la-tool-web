export type SORT =
  | "BIDSTART_PRICE"
  | "BUY_PRICE"
  | "EXPIREDATE"
  | "ITEM_GRADE"
  | "ITEM_LEVEL"
  | "ITEM_QUALITY";

export type SORT_CONDITION = "ASC" | "DESC";

export interface SearchDetailOption {
  FirstOption: number | null;
  SecondOption: number | null;
  MinValue: number | null;
  MaxValue: number | null;
}

export interface GetItemsProps {
  ItemLevelMin?: number;
  ItemLevelMax?: number;
  ItemGradeQuality?: number | null;
  SkillOptions?: SearchDetailOption[];
  EtcOptions?: SearchDetailOption[];
  Sort?: SORT;
  CategoryCode?: number;
  CharacterClass?: string;
  ItemTier?: number | null;
  ItemGrade?: string;
  ItemName?: string;
  PageNo?: number;
  SortCondition?: SORT_CONDITION;
}

export interface AuctionInfo {
  buyPrice: number;
  endDate: Date;
  tradeAmount: number;
}

export interface ItemOption {
  optionName: string;
  value: number;
  isValuePercentage?: boolean;
}

export interface Item {
  page: number;
  name: string;
  grade: string;
  gradeQuality: number;
  auctionInfo: AuctionInfo;
  arkPoint: number;
  itemOption: ItemOption[];
}
