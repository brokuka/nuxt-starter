/* eslint-disable no-console */
import fs from 'node:fs'
import cp from 'node:child_process'

export function makeFolder(path: string, cb: fs.NoParamCallback) {
  return fs.mkdir(path, { recursive: true }, cb)
}

export function execCmd(cmd: string) {
  cp.exec(cmd, (error, stdout) => {
    console.log(stdout)

    if (error !== null) {
      console.log(error)
    }
  })
}
