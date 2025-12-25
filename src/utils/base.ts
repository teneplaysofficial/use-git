import { exec } from "node:child_process";
import { Category } from "../types";

export abstract class Base {
  cwd: string;

  constructor(cwd: string = process.cwd()) {
    this.cwd = cwd;
  }

  private buildCmd(categ: Category | "", args: string[] = []): string {
    return ["git", categ, ...(args ?? [])].filter(Boolean).join(" ");
  }

  runCmd(categ: Category | "", args: string[] = []): Promise<string> {
    const cmd = this.buildCmd(categ, args);

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
                `Error executing command:\n${cmd}\n${stderr || err.message}`
              )
            );
          }

          resolve(stdout.trim());
        }
      );
    });
  }

  /**
   * Execute a git command and return success state
   *
   * @returns {Promise<boolean>} - true if command succeeded, false otherwise
   */
  runCmdSafe(category: Category | "", args: string[] = []): Promise<boolean> {
    const cmd = this.buildCmd(category, args);

    return new Promise((resolve) => {
      exec(cmd, { cwd: this.cwd }, (err) => {
        resolve(!err);
      });
    });
  }
}
