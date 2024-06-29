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

export interface IPackageManagerAndCwd {
  packageManager: PackageManager
  cwd: string
}

export interface IDownloadTemplate {
  destination: string
  name: TemplatesName
}

export interface IInstallDependencies extends IPackageManagerAndCwd {
  typescript: boolean
}

export type TemplatesName = 'v3' | 'v4' | '@brokuka'
