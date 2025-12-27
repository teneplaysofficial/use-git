export type GitConfigValue = string | boolean | unknown

export type GitConfigRecord = {
  [key: string]: GitConfigValue | GitConfigRecord
}

export interface GitConfig {
  core?: {
    autocrlf?: GitConfigValue
    fscache?: GitConfigValue
    symlinks?: GitConfigValue
    editor?: GitConfigValue
    repositoryformatversion?: GitConfigValue
    filemode?: GitConfigValue
    bare?: GitConfigValue
    logallrefupdates?: GitConfigValue
    ignorecase?: GitConfigValue
    hookspath?: GitConfigValue
    [key: string]: GitConfigValue
  }

  user?: {
    name?: GitConfigValue
    email?: GitConfigValue
    [key: string]: GitConfigValue
  }

  remote?: {
    origin?: {
      url?: GitConfigValue
      fetch?: GitConfigValue
      [key: string]: GitConfigValue
    }
    [section: string]: GitConfigRecord | GitConfigValue | undefined
  }

  branch?: {
    [branchName: string]: {
      remote?: GitConfigValue
      merge?: GitConfigValue
      [key: string]: GitConfigValue
    }
  }

  credential?: {
    helper?: GitConfigValue
    [key: string]: GitConfigValue
  }

  filter?: {
    [filterName: string]: {
      clean?: GitConfigValue
      smudge?: GitConfigValue
      process?: GitConfigValue
      required?: GitConfigValue
      [key: string]: GitConfigValue
    }
  }

  http?: {
    sslbackend?: GitConfigValue
    [key: string]: GitConfigValue
  }

  pull?: {
    rebase?: GitConfigValue
    [key: string]: GitConfigValue
  }

  init?: {
    defaultbranch?: GitConfigValue
    [key: string]: GitConfigValue
  }

  lfs?: {
    repositoryformatversion?: GitConfigValue
    [key: string]: GitConfigValue
  }

  [section: string]: GitConfigRecord | GitConfigValue | undefined
}
