export interface ICategories {
  income: {
    [key: string]: string[]
  }
  costs: {
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
  userId?: number,
  date: Date | string,
  type: Type,
  expense: Expenses,
  categoryName: string,
  subCategoryName: string,
  amount: number,
  currency: Currency,
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
  categoryName: string,
  subCategoryName: string,
  currency: Currency,
  date: string,
  description?: string,
  expense: Expenses,
  type: Type
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

export interface IMenuItem {
  title: string;
  url: string
}
