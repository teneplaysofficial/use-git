/**
 * Options for {@link diff}.
 */
export interface DiffOptions {
  flags?: (
    | "--patch"
    | "--stat"
    | "--numstat"
    | "--shortstat"
    | "--name-only"
    | "--name-status"
    | "--cached"
    | "--merge-base"
    | "--no-index"
    | "--raw"
    | "--quiet"
    | "--ignore-all-space"
    | "--ignore-space-at-eol"
    | "--ignore-cr-at-eol"
  )[]
}
