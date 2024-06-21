export enum SortProperty {
  RATING_DESC = "rating",
  PRICE_DESC = "price",
  TITLE_DESC = "title",
  RATING_ASC = "-rating",
  PRICE_ASC = "-price",
  TITLE_ASC = "-title",
}

export type SortType = {
  name: string;
  sortProperty: SortProperty;
};

export interface FiltersSliceState {
  categoryId: number;
  currentPage: number;
  search: string;
  sortType: SortType;
}
