export const COMMIT_FLAGS = {
  noVerify: "--no-verify",
  dryRun: "--dry-run",
  amend: "--amend",
  signOff: "--signoff",
  noEdit: "--no-edit",
  allowEmpty: "--allow-empty",
  allowEmptyMessage: "--allow-empty-message",
} as const

export type CommitFlagKeys = keyof typeof COMMIT_FLAGS
export type CommitFlagValues = (typeof COMMIT_FLAGS)[CommitFlagKeys]
