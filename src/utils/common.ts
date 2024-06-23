import fs from 'node:fs'
import cp from 'node:child_process'
import util from 'node:util'
import type { IAddPackage, ICopyFolder, IMakeFolder } from './types'

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

export function execCmd(cmd: string, cwd?: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd, { cwd })
}

export async function addPackage({ source, pkgManager, cwd }: IAddPackage) {
  if (typeof source === 'string') {
    await execCmd(`ni ${source}`)

    return
  }

  const packages = Object.keys(source).reduce((acc, cur) => {
    return `${acc} ${cur}@${source[cur]}`
  }, '').trim()

  await execCmd(`${pkgManager} install ${packages}`, cwd)
}
