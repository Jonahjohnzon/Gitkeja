import { addMonths, addYears } from 'date-fns';

export interface RecurringBill {
  id: number;
  type: string;
  amount: number;
  startDate: Date;
  frequency: 'monthly' | 'quarterly' | 'annually';
  property: string;
}

export const generateRecurringBills = (recurringBill: RecurringBill, endDate: Date): any[] => {
  const bills = [];
  let currentDate = new Date(recurringBill.startDate);

  while (currentDate <= endDate) {
    bills.push({
      ...recurringBill,
      dueDate: new Date(currentDate),
    });

    switch (recurringBill.frequency) {
      case 'monthly':
        currentDate = addMonths(currentDate, 1);
        break;
      case 'quarterly':
        currentDate = addMonths(currentDate, 3);
        break;
      case 'annually':
        currentDate = addYears(currentDate, 1);
        break;
    }
  }

  return bills;
};