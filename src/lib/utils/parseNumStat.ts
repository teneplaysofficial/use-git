import type { DiffStats } from "../diff"

/**
 * @since 0.2.0
 */
export function parseNumStat(output: string): DiffStats {
  let files = 0
  let additions = 0
  let deletions = 0
  let binaryFiles = 0

  for (const line of output.split("\n")) {
    if (!line.trim()) continue

    const [add, del] = line.split("\t")

    files++

    if (add === "-" && del === "-") {
      binaryFiles++
      continue
    }

    additions += Number(add)
    deletions += Number(del)
  }

  return { files, additions, deletions, binaryFiles }
}
