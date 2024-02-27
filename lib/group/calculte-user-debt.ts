
// type GroupExpenses = {amount: number, isSplit: number, user: {clerk_id: string, createdAt: Date, name: string}, payedTo: {clerk_id: string, createdAt: Date, name: string} | null}[]

export default function calculateUserDebt (expenses: any, userId: string) {
  const debt = expenses.reduce((amount: number, expense: any) => {
    if (expense.user.clerk_id === userId) {
      if (expense.isSplit) {
        return amount - (expense.amount / 2)
      } else {
        return amount - expense.amount
      }
    } else {
      if (expense.isSplit) {
        return amount + ( expense.amount / 2 )
      } else {
        return amount + expense.amount
      }
    }
  }, 0)
  return Math.max(debt, 0)
}
