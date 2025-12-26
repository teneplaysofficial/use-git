export type BranchFlags =
  | "--list"
  | "-l"
  | "--all"
  | "-a"
  | "--remotes"
  | "-r"
  | "--show-current"
  | "--contains"
  | "--no-contains"
  | "--merged"
  | "--no-merged"
  | "--points-at"
  | "--format"
  | "--color"
  | "--no-color"
  | "--column"
  | "--no-column"
  | "--sort"
  | "--verbose"
  | "-v"
  | "-vv"
  | "--quiet"
  | "-q"
  | "--abbrev"
  | "--no-abbrev"
  | "--omit-empty"
  | "--ignore-case"
  | "-i"
  | "--track"
  | "--no-track"
  | "-t"
  | "--create-reflog"
  | "--no-create-reflog"
  | "--recurse-submodules"
  | "-f"
  | "--force"
  | "--move"
  | "-m"
  | "-M"
  | "--copy"
  | "-c"
  | "-C"
  | "--delete"
  | "-d"
  | "-D"
  | "--set-upstream-to"
  | "-u"
  | "--unset-upstream"
  | "--edit-description";

export interface BranchValueFlags {
  "--sort"?: string;
  "--abbrev"?: number;
  "--contains"?: string;
  "--no-contains"?: string;
  "--merged"?: string;
  "--no-merged"?: string;
  "--points-at"?: string;
  "--format"?: string;
  "--set-upstream-to"?: string;
}

export interface BranchListOptions {
  list?: true;
  all?: true;
  remotes?: true;
  verbose?: 1 | 2;
  sort?: string;
  contains?: string;
  noContains?: string;
  merged?: string;
  noMerged?: string;
  pointsAt?: string;
  showCurrent?: true;
}

export interface BranchCreateOptions {
  name: string;
  startPoint?: string;
  force?: true;
  track?: "direct" | "inherit" | true;
  noTrack?: true;
  recurseSubmodules?: true;
}

export interface BranchRenameOptions {
  oldName?: string;
  newName: string;
  force?: true;
  copy?: true;
}

export interface BranchDeleteOptions {
  names: string[];
  force?: true;
  remotes?: true;
}

export type BranchOptions =
  | ({ flags?: BranchFlags[] } & BranchValueFlags)
  | BranchListOptions
  | BranchCreateOptions
  | BranchRenameOptions
  | BranchDeleteOptions;
