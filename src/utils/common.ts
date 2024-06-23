import fs from 'node:fs'
import cp from 'node:child_process'
import util from 'node:util'
import type { ICopyFolder, IMakeFolder } from './types'

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

export function copyFolder({
  from,
  to,
  recursive = true,
  cb,
}: ICopyFolder) {
  return fs.cp(from, to, { recursive }, (err) => {
    if (err) {
      console.error(err)
    }

    if (cb) {
      cb()
    }
  })
}

export function execCmd(cmd: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd)
}

export async function addPackage(source: string | Record<string, string>) {
  if (typeof source === 'string') {
    await execCmd(`ni ${source}`)

    return
  }

  const packages = Object.keys(source).reduce((acc, cur) => {
    return `${acc} ${cur}@${source[cur]}`
  }, '').trim()

  return await execCmd(`ni ${packages}`)
}
