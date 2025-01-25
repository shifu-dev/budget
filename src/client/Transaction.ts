export interface Transaction {
  id: string
  title: string
  amount: number
  time: Date
  category: string
  tags: string[]
  notes: string
}
