import utils from "../../internal"

/**
 * @since 0.1.0
 */
export async function isCleanWorkingTree(): Promise<boolean> {
  const res = await utils.runCmd("status", ["--porcelain"])
  return !res.length
}
