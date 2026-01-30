import fs from "node:fs/promises"
import { EOL } from "node:os"
import path from "node:path"
import { Node, Project } from "ts-morph"

const ROOT = process.cwd()
const SRC_DIR = path.join(ROOT, "src")
const LIB_DIR = path.join(ROOT, "src/lib")
const IS_CHECK = process.argv.includes("--check")
const outOfSyncIndexFiles = []
const IGNORE_FOLDERS = ["cache", "utils"]
const OUT_FILE = path.join(ROOT, "exports.json")

const normalize = (s) => s.replace(/\r\n/g, "\n")
const toPosixPath = (p) => p.split(path.sep).join("/")

async function readDir(dir) {
  return fs.readdir(dir, { withFileTypes: true })
}

function indexContent(lines) {
  return `// AUTO-GENERATED FILE - DO NOT EDIT MANUALLY${EOL}${EOL}${lines.join(EOL)}${EOL}`
}

async function generateIndex(dir) {
  const entries = await readDir(dir)

  await Promise.all(
    entries
      .filter((e) => e.isDirectory() && !IGNORE_FOLDERS.includes(e.name))
      .map((e) => generateIndex(path.join(dir, e.name))),
  )

  const exports = []

  for (const e of entries) {
    const full = path.join(dir, e.name)

    if (e.isDirectory() && !IGNORE_FOLDERS.includes(e.name)) {
      try {
        if ((await fs.readdir(full)).includes("index.ts")) {
          exports.push(`export * from "./${e.name}"`)
        }
      } catch {}
    }

    if (e.isFile() && e.name.endsWith(".ts") && e.name !== "index.ts") {
      exports.push(`export * from "./${e.name.replace(/\.ts$/, "")}"`)
    }
  }

  if (!exports.length) return

  const content = indexContent(exports.sort((a, b) => a.localeCompare(b)))
  const indexPath = path.join(dir, "index.ts")

  if (IS_CHECK) {
    try {
      const current = await fs.readFile(indexPath, "utf8")
      if (normalize(current) !== normalize(content)) {
        outOfSyncIndexFiles.push(toPosixPath(path.relative(ROOT, indexPath)))
      }
    } catch {
      outOfSyncIndexFiles.push(toPosixPath(path.relative(ROOT, indexPath)))
    }
  } else {
    await fs.writeFile(indexPath, content, "utf8")
  }
}

await generateIndex(LIB_DIR)

if (IS_CHECK && outOfSyncIndexFiles.length) {
  console.error("index.ts files out of sync:\n")

  for (const f of outOfSyncIndexFiles) {
    console.error("  •", f)
  }

  console.error("\nRun `pnpm exports` to regenerate index.ts files.")
  process.exit(1)
}

const project = new Project({
  tsConfigFilePath: path.join(ROOT, "tsconfig.json"),
})

project.addSourceFilesAtPaths(`${SRC_DIR}/**/*.ts`)

const exportMap = new Map()

for (const file of project.getSourceFiles()) {
  const filePath = toPosixPath(path.relative(ROOT, file.getFilePath()))
  if (path.basename(filePath) === "index.ts") continue

  const seen = new Set()

  for (const stmt of file.getStatements()) {
    if (!stmt.isExported?.()) continue
    if (Node.isFunctionDeclaration(stmt) && !stmt.getBody()) continue

    const symbol = stmt.getSymbol?.()
    if (!symbol) continue

    const name = symbol.getName()
    if (!name || name === "default" || seen.has(name)) continue
    seen.add(name)

    if (!exportMap.has(name)) {
      exportMap.set(name, {
        name,
        kind: stmt.getKindName(),
        files: new Set(),
      })
    }

    exportMap.get(name).files.add(filePath)
  }
}

const exportsList = [...exportMap.values()]
  .map((e) => {
    const files = [...e.files].sort()
    return {
      name: e.name,
      kind: e.kind,
      count: files.length,
      isDuplicate: files.length > 1,
      files,
      hint:
        files.length > 1 ? "Export names must be unique across files" : null,
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const duplicates = exportsList.filter((e) => e.isDuplicate)

const output = {
  generatedAt: new Date().toISOString(),
  totalExports: exportsList.length,
  duplicateCount: duplicates.length,
  exports: exportsList,
}

const json = JSON.stringify(output, null, 2)

if (IS_CHECK) {
  try {
    const current = JSON.parse(await fs.readFile(OUT_FILE, "utf8"))
    delete current.generatedAt
    delete output.generatedAt

    if (JSON.stringify(current) !== JSON.stringify(output)) {
      console.error("exports.json is out of sync")
      console.error("Run `pnpm exports` to regenerate it")
      process.exit(1)
    }
  } catch (err) {
    console.error("exports.json missing or malformed:", err.message)
    process.exit(1)
  }
} else {
  await fs.writeFile(OUT_FILE, json, "utf8")
}

if (duplicates.length) {
  console.error("Export collisions detected\n")

  for (const d of duplicates) {
    console.error(`${d.name} (${d.kind})`)
    for (let i = 0; i < d.files.length; i++) {
      console.error(`  ${i + 1}. ${d.files[i]}`)
    }
    console.error("")
  }

  process.exit(1)
}
