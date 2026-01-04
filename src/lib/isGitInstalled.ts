import utils from "../internal"

/**
 * @since 0.1.0
 */
export async function isGitInstalled(): Promise<boolean> {
  return utils.runCmdSafe("", ["--version"])
}
