export interface Transaction {
  id: string
  title: string
  amount: number
  datetime: Date
  category: string
  tags: string[]
  notes: string
}
