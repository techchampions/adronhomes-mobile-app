import { Transaction } from "./userTransactionsTypes";

export interface TransactionByIDResponse {
  success: boolean;
  user_transaction: Transaction;
}
