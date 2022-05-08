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
  progress: string
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
  amount: number,
  currency: string,
  dateString: string
}

export interface Transaction {
  amount: number,
  category: string,
  currency: Currency,
  date: string,
  description?: string,
  expense: Expenses,
  type: Type,
  userId?: number,
  categoryName?: string;
}
export interface ITotalByCategory {
  categoryName: string,
  value: number
}

export interface Currency {
  value: number,
  title: string
}

export interface Expenses {
  title: string;
  value: string
}

export interface Type {
  id: number;
  title: string;
  value: string;
}

export interface Categories {
  categoryName: string;
  subCategories: object;
}