import cp from 'node:child_process'
import util from 'node:util'

export function execCmd(cmd: string, cwd?: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd, { cwd })
}

export function transformObjectToArray(obj: Record<string, string>) {
  return Object.keys(obj).map(key => `${key}@${obj[key]}`)
}
