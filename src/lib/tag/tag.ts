import utils from "../../internal"
import type { TagOptions } from "../types/TagOptions"

/**
 *
 * @since 1.0.0
 */
export function tag(opts: TagOptions = {}): Promise<string> {
  return utils.runCmd("tag", utils.buildArgs(opts))
}
