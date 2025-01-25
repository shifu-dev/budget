import { Transaction } from '@client/Transaction'

export class Client {
  getTransactions = (args?: { count?: number }): Transaction[] => {
    return this.getDummyTransactions(args ?? { count: 100 })
  }

  getDummyTransactions = (args: { count?: number }): Transaction[] => {
    const { count } = args ?? {}

    const dummyTransaction: Transaction = {
      id: '',
      title: '',
      time: new Date(),
      amount: 100,
      notes: '',
      category: 'income',
      tags: [],
    }

    return Array(count)
      .fill(dummyTransaction)
      .map((_, index) => ({
        ...dummyTransaction,
        id: `txn-${index + 1}`,
        title: `Transaction ${index + 1}`,
        time: new Date(Date.now() + index * 1000 * 60 * 60 * 24),
      }))
  }
}
