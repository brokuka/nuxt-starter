import cp from 'node:child_process'
import util from 'node:util'
import os from 'node:os'
import { normalize } from 'pathe'
import { OWNER, TEMPLATES_REPO } from './constants'
import type { Branch, ITransformPackagesSource, PackageResult, PackageVersion, StylePackage } from './types'

export function execCmd(cmd: string, cwd?: string) {
  const exec = util.promisify(cp.exec)

  return exec(cmd, { cwd })
}

export function transformObjectToArray(
  source: ITransformPackagesSource['source'],
  result: ITransformPackagesSource['result'] = { dependencies: [], devDependencies: [] },
): PackageResult {
  const addPackage = (name: string, isDev = true): void => {
    const target = isDev ? result.devDependencies : result.dependencies
    target.push(name)
  }

  const processPackage = (key: string, value: string | PackageVersion | Record<string, any>): void => {
    if (typeof value === 'object' && value !== null) {
      if ('version' in value) {
        const packageName = `${key}@${value.version}`

        addPackage(packageName, value.dev !== false)

        return
      }

      transformObjectToArray(value, result)

      return
    }

    addPackage(`${key}@${value}`)
  }

  if (Array.isArray(source)) {
    source.forEach((item) => {
      const target = item.packages || item
      transformObjectToArray(target, result)
    })

    return result
  }

  Object.entries(source).forEach(([key, value]) => {
    processPackage(key, value)
  })

  return result
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
