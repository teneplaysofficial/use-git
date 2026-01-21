export interface TagOptions {
  flags?: ("--list" | "--force" | "--ignore-case" | "--omit-empty")[]

  /**
   * Verify the cryptographic signature of the given tag.
   */
  "--verify"?: string

  /**
   * Delete the given tag.
   */
  "--delete"?: string

  /**
   * Sort tags by the given key.
   * Example: 'version:refname'
   */
  "--sort"?: string

  /**
   * Message for annotated tags.
   */
  "--message"?: string
}
