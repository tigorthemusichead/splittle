"use server";
import createExpense, {CreateExpenseParams} from "@/lib/expense/create";

export default async function createExpenseAction (params: CreateExpenseParams): Promise<number | null> {
  const response = await createExpense(params)
  if (response.success) {
    return (response as any).id
  }
  return null
}
