import fs from 'node:fs'
import cp from 'node:child_process'
import util from 'node:util'
import type { IMakeFolder } from './types'

export function makeFolder({ cb, path, recursive = true }: IMakeFolder) {
  return fs.mkdir(path, { recursive }, (err) => {
    if (err) {
      console.error(err)
    }

    if (cb) {
      cb()
    }
  })
}

export function execCmd(cmd: string, cwd?: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd, { cwd })
}

export function transformObjectToArray(obj: Record<string, string>) {
  return Object.keys(obj).map(key => `${key}@${obj[key]}`)
}
