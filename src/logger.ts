import { EOL } from "node:os"

const BRAND = "use-git" as const

const COLORS = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  gray: "\x1b[90m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  magenta: "\x1b[35m",
  highlight: "\x1b[94m",
} as const

const LEVEL = {
  DEBUG: {
    label: "DEBUG",
    color: COLORS.magenta,
    stream: process.stdout,
  },
  NOTICE: {
    label: "NOTICE",
    color: COLORS.green,
    stream: process.stdout,
  },
  WARN: {
    label: "WARN",
    color: COLORS.yellow,
    stream: process.stderr,
  },
  ERROR: {
    label: "ERROR",
    color: COLORS.red,
    stream: process.stderr,
  },
} as const

type LogLevel = keyof typeof LEVEL

function write(level: LogLevel, message: string) {
  const l = LEVEL[level]

  l.stream.write(
    `${COLORS.dim}[${BRAND}]${COLORS.reset} ` +
      `${l.color}${l.label.padEnd(6)}${COLORS.reset} ` +
      `${message}${EOL}`,
  )
}

const logger = {
  debug(message: string) {
    if (process.env.DEBUG) write("DEBUG", message)
  },

  notice(message: string) {
    write("NOTICE", message)
  },

  warn(message: string) {
    write("WARN", message)
  },

  error(message: string) {
    write("ERROR", message)
  },

  highlight: (value: string | number) =>
    `${COLORS.highlight}${value}${COLORS.reset}`,
} as const

export default logger
