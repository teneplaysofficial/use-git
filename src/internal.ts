import { spawn } from "node:child_process"
import logger from "./logger"
import { cwd } from "./state"
import type { Category } from "./types/category"

export type GitArgs = ReadonlyArray<string | boolean | undefined>

function runCmd(categ: Category | "", args: GitArgs = []): Promise<string> {
  const cmd = [categ, ...args].filter(Boolean) as string[]

  logger.debug(`running: ${logger.highlight(`git ${cmd.join(" ")}`)}`)

  return new Promise((resolve, reject) => {
    const child = spawn("git", cmd, {
      cwd,
    })

    let stdout = ""
    let stderr = ""

    child.stdout.on("data", (data) => {
      stdout += data.toString()
    })

    child.stderr.on("data", (data) => {
      stderr += data.toString()
    })

    child.on("error", (err) => {
      reject(
        new Error(
          `Error executing command git ${cmd.join(" ")}: ${err.message}`,
        ),
      )
    })

    child.on("close", (code) => {
      if (code !== 0) {
        return reject(
          new Error(
            `Git command failed (exit ${code}):\n${cmd.join(" ")}\n${stderr.trim()}`,
          ),
        )
      }

      resolve(stdout.trim())
    })
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
  const cmd = [category, ...args].filter(Boolean) as string[]

  logger.debug(`running: ${logger.highlight(`git ${cmd.join(" ")}`)}`)

  return new Promise((resolve) => {
    const child = spawn("git", cmd, { cwd })

    child.on("error", () => {
      resolve(false)
    })

    child.on("close", (code) => {
      resolve(code === 0)
    })
  })
}

function buildArgs<T extends { flags?: string[] }>(opts: T): string[] {
  const args: string[] = []

  if (opts.flags?.length) {
    args.push(...new Set(opts.flags))
  }

  for (const [key, value] of Object.entries(opts)) {
    if (value == null || !key.startsWith("--")) continue

    if (typeof value === "boolean") {
      if (value) args.push(key)
      continue
    }

    args.push(key, String(value))
  }

  return args
}

function mergeOpts<T extends object>(defaults: T, user: T | undefined) {
  if (!user) return defaults

  return {
    ...defaults,
    ...user,
  }
}

function makeList(data: string): string[] {
  return data
    .split(/\r?\n/)
    .map((b) => b.replace(/^\*?\s+/, ""))
    .filter(Boolean)
}

export const utils = {
  runCmd,
  runCmdSafe,
  buildArgs,
  mergeOpts,
  makeList,
}
export default utils
