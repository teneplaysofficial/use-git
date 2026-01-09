import { branch } from "./branch"

/**
 * @since 1.0.0
 */
export function currentBranch(): Promise<string> {
  return branch({
    flags: ["--show-current"],
  })
}
