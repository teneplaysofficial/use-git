import utils from "../../internal"
import type { BranchListFormat, BranchListResult } from "../types"
import { branch } from "./branch"

/**
 * List all branches.
 *
 * @example
 * ```ts
 * await listAllBranches()
 * ```
 *
 * @since 1.0.0
 */
export async function listAllBranches<T extends BranchListFormat>(
  format: T = "flat" as T,
): Promise<BranchListResult<T>> {
  const res = utils.makeList(await branch({ flags: ["--all"] }))

  if (format === "flat") {
    return res as BranchListResult<T>
  }

  const local: string[] = []
  const remote: string[] = []
  let head: string | undefined

  for (const b of res) {
    if (b.startsWith("remotes/")) {
      const name = b.replace(/^remotes\//, "")

      if (name.includes("/HEAD ->")) {
        head = name.split("->")[1].trim()
      } else {
        remote.push(name)
      }
    } else {
      local.push(b)
    }
  }

  if (format === "json") {
    return { local, remote, head } as BranchListResult<T>
  }

  return [
    "type,name",
    ...local.map((b) => `local,${b}`),
    ...remote.map((b) => `remote,${b}`),
    ...(head ? [`head,${head}`] : []),
  ].join("\n") as BranchListResult<T>
}
