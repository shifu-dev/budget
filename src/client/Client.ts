import { Transaction } from '@client/Transaction'
import * as fs from '@tauri-apps/plugin-fs'
import { v4 as uuid4 } from 'uuid'

interface ClientData {
  username: string
  tags: string[]
  categories: string[]
  transactions: Transaction[]
}

type MakeRequired<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>

export type TransactionCreateInput = Omit<Transaction, 'id'>

export type TransactionUpdateInput = MakeRequired<Transaction, 'id'>

export class Client {
  _DATA_FILE_PATH = 'budget-data.json'
  _username: string = ''
  _tags: string[] = []
  _categories: string[] = []
  _transactions: Transaction[] = []

  loadData = async () => {
    const dataString = await fs.readTextFile(this._DATA_FILE_PATH, {
      baseDir: fs.BaseDirectory.AppConfig,
    })

    const data = this.deserializeData(dataString)

    this._username = data.username
    this._tags = data.tags
    this._categories = data.categories
    this._transactions = data.transactions
  }

  saveData = async () => {
    const dataString = this.serializeData({
      username: this._username,
      tags: this._tags,
      categories: this._categories,
      transactions: this._transactions,
    })

    await fs.writeTextFile(this._DATA_FILE_PATH, dataString, {
      baseDir: fs.BaseDirectory.AppConfig,
    })
  }

  deserializeData = (dataString: string): ClientData => {
    const object = JSON.parse(dataString)
    const data: ClientData = {
      username: object.username ?? '',
      categories: object.categories ?? [],
      tags: object.tags ?? [],
      transactions: object.transactions ?? [],
    }

    return data
  }

  serializeData = (data: ClientData): string => {
    return JSON.stringify(data)
  }

  getTransactions = (args?: { count?: number }): Transaction[] => {
    const { count } = args ?? {}
    return this._transactions.slice(0, count)
  }

  getTransaction = (args: { id: string }): Transaction | undefined => {
    const { id } = args
    return this._transactions.find(transaction => transaction.id === id)
  }

  updateTransaction = (
    input: TransactionUpdateInput,
  ): Transaction | undefined => {
    const index = this._transactions.findIndex(
      transaction => transaction.id === input.id,
    )

    if (index < 0) return undefined

    const transaction = this._transactions[index]
    const newTransaction = {
      ...transaction,
      ...input,
    }

    this._transactions[index] = newTransaction
    return newTransaction
  }

  addTransaction = (input: TransactionCreateInput): Transaction => {
    const transaction: Transaction = {
      ...input,
      id: uuid4(),
    }

    this._transactions.push(transaction)
    return transaction
  }

  deleteTransaction = (id: string): boolean => {
    const index = this._transactions.findIndex(
      transaction => transaction.id === id,
    )
    if (index < 0) return false

    this._transactions.splice(index, 1)
    return true
  }
}
