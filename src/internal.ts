import { exec } from "node:child_process"
import logger from "./logger"
import { cwd } from "./state"
import type { Category } from "./types/category"

export type GitArgs = ReadonlyArray<string | boolean | undefined>

function buildCmd(categ: Category | "", args: GitArgs = []): string {
  return ["git", categ, ...(args ?? [])].filter(Boolean).join(" ")
}

function runCmd(categ: Category | "", args: GitArgs = []): Promise<string> {
  const cmd = buildCmd(categ, args)

  logger.debug(`running: ${logger.highlight(cmd)}`)

  return new Promise((resolve, reject) => {
    exec(
      cmd,
      {
        cwd,
      },
      (err, stdout, stderr) => {
        if (err) {
          return reject(
            new Error(
              `Error executing command:\n${cmd}\n${stderr || err.message}`,
            ),
          )
        }

        resolve(stdout.trim())
      },
    )
  })
}

/**
 * Execute a git command and return success state
 *
 * @returns {Promise<boolean>} - true if command succeeded, false otherwise
 */
function runCmdSafe(
  category: Category | "",
  args: GitArgs = [],
): Promise<boolean> {
  const cmd = buildCmd(category, args)

  logger.debug(`running: ${logger.highlight(cmd)}`)

  return new Promise((resolve) => {
    exec(cmd, { cwd }, (err) => {
      resolve(!err)
    })
  })
}

function buildArgs<T extends { flags?: string[] }>(opts: T): string[] {
  const args: string[] = []

  if (opts.flags?.length) {
    args.push(...opts.flags)
  }

  for (const [key, value] of Object.entries(opts)) {
    if (key === "flags" || value === undefined) continue

    if (typeof value === "boolean") {
      if (value) args.push(key)
      continue
    }

    args.push(key, String(value))
  }

  return args
}

function quoteArg(d: string) {
  return `"${d.replace(/"/g, '\\"')}"`
}

export const utils = { buildCmd, runCmd, runCmdSafe, buildArgs, quoteArg }
export default utils
