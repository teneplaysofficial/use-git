import fs from "node:fs/promises"
import { EOL } from "node:os"
import path from "node:path"

const ROOT = process.cwd()
const LIB_DIR = path.join(ROOT, "src/lib")
const IS_CHECK = process.argv.includes("--check")
const outOfSyncFiles = []
const IGNORE_FOLDERS = ["cache", "utils"]

const hasIndex = async (dir) =>
  fs
    .readdir(dir)
    .then((f) => f.includes("index.ts"))
    .catch(() => false)

async function generateIndex(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  await Promise.all(
    entries
      .filter((e) => e.isDirectory())
      .map((e) => generateIndex(path.join(dir, e.name))),
  )

  const exports = await Promise.all(
    entries.map(async (e) => {
      const full = path.join(dir, e.name)

      if (
        e.isDirectory() &&
        !IGNORE_FOLDERS.includes(e.name) &&
        (await hasIndex(full))
      ) {
        return `export * from "./${e.name}"`
      }

      if (e.isFile() && e.name.endsWith(".ts") && e.name !== "index.ts") {
        return `export * from "./${e.name.replace(/\.ts$/, "")}"`
      }

      return null
    }),
  )

  const lines = exports.filter(Boolean).sort((a, b) => a.localeCompare(b))

  const indexPath = path.join(dir, "index.ts")
  const content = `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY${EOL}${EOL}${lines.join(EOL)}${EOL}`

  if (IS_CHECK) {
    try {
      const current = await fs.readFile(indexPath, "utf8")
      if (current !== content)
        outOfSyncFiles.push(path.relative(ROOT, indexPath))
    } catch {
      outOfSyncFiles.push(path.relative(ROOT, indexPath))
    }

    return
  } else {
    await fs.writeFile(indexPath, content, "utf8")
  }
}

await generateIndex(LIB_DIR)

if (IS_CHECK && outOfSyncFiles.length) {
  console.error("The following index.ts file(s) are out of sync:\n")

  for (const file of outOfSyncFiles) {
    console.error("  •", file)
  }

  console.error("\nPlease run `pnpm gen` to regenerate the files.")
  process.exit(1)
}
