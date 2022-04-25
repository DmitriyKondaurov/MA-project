export interface Categories {
    income: Income;
    cost: Cost;
}

export interface Income {
    salaryIncome: string[]; 
    giftsIncome: string[]; 
    rentalIncome: string[]; 
    depositInterestIncome: string[]; 
    depositIncome: string[]; 
    royaltyIncome: string[]; 
    otherIncome: string[]; 
}

export interface Cost {
    dailyExpensesCost: string[];
    utilityPaymentsCost: string[];
    transportCost: string[];
    childrenCost: string[];
    healthCost: string[];
    rentHomeMaintenance: string[];
    entertainment: string[];
    giftsCost: string[];
    loanCost: string[];
    depositCost: string[];
    businessCost: string[];
    tripCost: string[];
    otherCost: string[];
    goals: string[];
}