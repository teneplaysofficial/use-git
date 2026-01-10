import type { BranchListFormat } from "./BranchListFormat"
import type { BranchListResultMap } from "./BranchListResultMap"

export type BranchListResult<T extends BranchListFormat> =
  BranchListResultMap[T]
