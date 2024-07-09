import type { ExecException } from 'node:child_process'
import type { PackageManager } from '@antfu/install-pkg'

export type Keys<T extends Record<string, unknown>> = keyof T

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
  cwd: string
  name: TemplatesName
}

export interface IInstallDependencies extends IPackageManagerAndCwd {
  additional: {
    typescript: boolean
    unocss: boolean
  }
}

export interface Branch {
  name: string
  commit: BranchCommit
  protected: boolean
}

export interface BranchCommit {
  sha: string
  url: string
}

export type TemplatesName = 'v3' | 'v4' | '@brokuka'
