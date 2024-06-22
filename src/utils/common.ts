import fs from 'node:fs'
import cp from 'node:child_process'
import util from 'node:util'
// romise.promisify(require('child_process').exec);

export function makeFolder(path: string, cb: fs.NoParamCallback) {
  return fs.mkdir(path, { recursive: true }, cb)
}

export function execCmd(cmd: string) {
  // return new Promise((resolve, reject) => {
  //   const { stdout } = cp.exec(cmd, (error) => {
  //     resolve(stdout)

  //     if (error !== null) {
  //       reject(error.message)
  //     }
  //   })
  // })
  const exec = util.promisify(cp.exec)

  return exec(cmd)
}
