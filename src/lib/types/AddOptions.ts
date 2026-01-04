export interface AddOptions {
  flags?: (
    | "--dry-run"
    | "--force"
    | "--sparse"
    | "--update"
    | "--all"
    | "--ignore-removal"
    | "--intent-to-add"
    | "--refresh"
    | "--ignore-errors"
    | "--ignore-missing"
    | "--renormalize"
    | "--chmod=+x"
    | "--chmod=-x"
  )[]
}
