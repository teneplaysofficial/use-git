import utils from "../../internal"

/**
 * @since 0.1.0
 */
export function isInitialized(): Promise<boolean> {
  return utils.runCmdSafe("rev-parse", ["--git-dir"])
}
