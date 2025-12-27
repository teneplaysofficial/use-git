import { exec } from "node:child_process"
import type { Category } from "../types"
import logger, { highlight } from "./logger"

export type GitArgs = ReadonlyArray<string | boolean | undefined>

export default abstract class Base {
  cwd: string

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd
  }

  private buildCmd(categ: Category | "", args: GitArgs = []): string {
    return ["git", categ, ...(args ?? [])].filter(Boolean).join(" ")
  }

  runCmd(categ: Category | "", args: GitArgs = []): Promise<string> {
    const cmd = this.buildCmd(categ, args)

    logger.debug(`running: ${highlight(cmd)}`)

    return new Promise((resolve, reject) => {
      exec(
        cmd,
        {
          cwd: this.cwd,
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
  runCmdSafe(category: Category | "", args: GitArgs = []): Promise<boolean> {
    const cmd = this.buildCmd(category, args)

    logger.debug(`running: ${highlight(cmd)}`)

    return new Promise((resolve) => {
      exec(cmd, { cwd: this.cwd }, (err) => {
        resolve(!err)
      })
    })
  }

  buildArgs<T extends { flags?: string[] }>(opts: T): string[] {
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

  quoteArg(d: string) {
    return `"${d.replace(/"/g, '\\"')}"`
  }
}
