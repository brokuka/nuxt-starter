import type { ExecException } from 'node:child_process'
import type { PackageManager } from '@antfu/install-pkg'

export interface IPromtTextGroup {
  message: string
  placeholder?: string
  defaultValue: string
}

export interface IPromtSelect {
  label: string
  value: string
  hint?: string
}

export interface IExecFileException extends Omit<ExecException, 'code'>, Omit<NodeJS.ErrnoException, 'code'> { code?: string | number | undefined | null }

export interface IMakeFolder {
  path: string
  recursive?: boolean
  cb?: Function
}

export interface IPackageManagerAndCwd {
  packageManager: PackageManager
  cwd: string
}

export interface IDownloadTemplate {
  destination: string
}
