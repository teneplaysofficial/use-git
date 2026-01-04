/**
 * Options for {@link isDirty}.
 */
export interface IsDirtyOptions {
  /**
   * Ignore untracked files.
   *
   * @summary
   * When enabled, only tracked file changes (modified, staged, or deleted) will be considered.
   *
   * @default false
   */
  trackedOnly?: boolean
}
