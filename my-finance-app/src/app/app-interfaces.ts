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

export interface ITransactArchive {
  id: number,
  userId: number,
  date: Date,
  flowDirection: string,
  planFact: string,
  categoryName: string,
  subCategoryName: string,
  value: number,
  currency: string,
  description: string
}

export interface IAppColors {
  lastUsed: number
  [key: number]: string
  next(): void
}

export interface IBalance {
  balance: number,
  currency: string,
  date: Date
}


