export interface ICategories {
  income: {
    [key: string]: string[]
  }
  cost: {
    [key: string]: string[],
    goals: string[]
  }
}

export interface IFrontPageItem {
  name: string
  value: number
  total: number
}

export interface ICostArchive   {
  categoryName: string
  subCategoryName: string
  date: Date
  value: number
}

export interface IAppColors {
  lastUsed: number
  [key: number]: string
  next(): void
}



