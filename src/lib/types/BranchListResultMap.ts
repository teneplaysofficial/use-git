export type BranchListResultMap = {
  flat: string[]
  json: {
    local: string[]
    remote: string[]
    head?: string
  }
  csv: string
}
