import cp from 'node:child_process'
import util from 'node:util'
import os from 'node:os'
import { normalize } from 'pathe'
import { OWNER, TEMPLATES_REPO } from './constants'
import type { Branch } from './types'

export function execCmd(cmd: string, cwd?: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd, { cwd })
}

export function transformObjectToArray(obj: Record<string, string | Record<string, string>>): string[] {
  return Object.keys(obj).flatMap((key) => {
    const value = obj[key]

    if (typeof value === 'string') {
      return `${key}@${value}`
    }

    return transformObjectToArray(value).map(pkg => pkg)
  })
}

export async function getAllBraches() {
  const repoBranchesUrl = `https://api.github.com/repos/${OWNER}/${TEMPLATES_REPO}/branches`

  try {
    const response = (await fetch(repoBranchesUrl))

    if (!response.ok) {
      throw new Error('Failed to fetch repository branches')
    }

    const branches: Branch[] = await response.json()

    return branches.map(branch => branch.name)
  }
  catch (error) {
    console.error(error)
  }
}

export function getAbsolutePath(path: string) {
  return (path === '~' || path.startsWith('~/')) ? path.replace('~', normalize(os.homedir())) : path
}
