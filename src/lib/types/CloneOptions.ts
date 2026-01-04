export interface CloneOptions {
  flags?: (
    | "--local"
    | "--no-hardlinks"
    | "--shared"
    | "--dissociate"
    | "--quiet"
    | "--progress"
    | "--no-checkout"
    | "--reject-shallow"
    | "--no-reject-shallow"
    | "--bare"
    | "--sparse"
    | "--also-filter-submodules"
    | "--mirror"
    | "--no-tags"
    | "--single-branch"
    | "--no-single-branch"
  )[]

  dir?: string

  "--filter"?: string

  "--origin"?: string

  "--branch"?: string

  "--revision"?: string

  "--upload-pack"?: string

  "--depth"?: number | string
}
