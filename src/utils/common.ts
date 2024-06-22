import fs from 'node:fs'
import cp from 'node:child_process'
import util from 'node:util'

export function makeFolder(path: string, cb: fs.NoParamCallback) {
  return fs.mkdir(path, { recursive: true }, cb)
}

export function execCmd(cmd: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd)
}
