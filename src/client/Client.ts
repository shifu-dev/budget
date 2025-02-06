import { Transaction } from '@client/Transaction'
import * as path from '@tauri-apps/api/path'
import * as fs from '@tauri-apps/plugin-fs'
import { v4 as uuid4 } from 'uuid'

interface ClientData {
  username: string
  categories: string[]
  tags: string[]
  transactions: Transaction[]
}

const initClientData: ClientData = {
  username: '',
  categories: [],
  tags: [],
  transactions: [],
}

type MakeRequired<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>

export type TransactionCreateInput = Omit<Transaction, 'id'>

export type TransactionUpdateInput = MakeRequired<Transaction, 'id'>

export class Client {
  _configFilePath = ''
  _configFileName = 'budget-data.json'
  _username: string = ''
  _categories: string[] = []
  _tags: string[] = []
  _transactions: Transaction[] = []

  init = async () => {
    await this.loadData()
  }

  loadData = async () => {
    const appConfigDir = await path.appConfigDir()
    this._configFilePath = `${appConfigDir}/${this._configFileName}`

    console.info(`Default config path set to '${this._configFilePath}'.`)

    let dataString = ''
    try {
      console.info(`Reading config file from '${this._configFilePath}'...`)

      dataString = await fs.readTextFile(this._configFilePath)

      console.info(`Reading config file done.`)
    } catch (error) {
      console.error(`Reading config file failed. Error: ${error}`)

      try {
        console.info(`Creating new config file...`)

        dataString = this.serializeData(initClientData)
        await fs.writeTextFile(this._configFilePath, dataString)

        console.info(`Creating new config file done.`)
      } catch (error) {
        console.info(`Creating new config file failed. Error: ${error}`)
        console.info(`Exiting...`)
        return
      }
    }

    console.info('Deserializing data...')

    const data = this.deserializeData(dataString)

    this._username = data.username
    this._tags = data.tags
    this._categories = data.categories
    this._transactions = data.transactions

    console.info('Deserializing data done.')
  }

  saveData = async () => {
    const dataString = this.serializeData({
      username: this._username,
      tags: this._tags,
      categories: this._categories,
      transactions: this._transactions,
    })

    console.info(`Writing config file to '${this._configFilePath}'...`)

    await fs.writeTextFile(this._configFilePath, dataString)

    console.info(`Writing config done.`)
  }

  deserializeData = (dataString: string): ClientData => {
    const object = JSON.parse(dataString)

    const rawTransactions = (object.transactions ?? []) as {
      [id: string]: string
    }[]
    const transactions = rawTransactions.map(transaction => {
      return {
        id: transaction.id,
        title: transaction.title,
        datetime: new Date(transaction.time),
        amount: parseInt(transaction.amount),
        category: transaction.categories,
        tags: transaction.tags as any as string[],
        notes: transaction.notes,
      } as Transaction
    })

    const data: ClientData = {
      username: object.username ?? '',
      categories: object.categories ?? [],
      tags: object.tags ?? [],
      transactions: transactions,
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
    this.saveData()

    return newTransaction
  }

  addTransaction = (input: TransactionCreateInput): Transaction => {
    const transaction: Transaction = {
      ...input,
      id: uuid4(),
    }

    this._transactions.push(transaction)
    this.saveData()

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

  getCategories = (): string[] => {
    return this._categories
  }

  getTags = (): string[] => {
    return this._tags
  }
}
