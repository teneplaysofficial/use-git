import type { BranchListFormat } from "./BranchListFormat"

type BranchListResultMap = {
  flat: string[]
  json: {
    local: string[]
    remote: string[]
    head?: string
  }
  csv: string
}

export type BranchListResult<T extends BranchListFormat> =
  BranchListResultMap[T]
