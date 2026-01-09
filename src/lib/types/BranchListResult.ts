export type BranchListResult =
  | string
  | string[]
  | {
      local?: string[]
      remote?: string[]
      head?: string
    }
