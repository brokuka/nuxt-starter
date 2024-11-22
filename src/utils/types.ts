import type { ExecException } from 'node:child_process'
import type { PackageManager } from '@antfu/install-pkg'

export type Keys<T extends Record<string, unknown>> = keyof T

export interface IPromtTextGroup {
  message: string
  placeholder?: string
  defaultValue: string
}

export interface IPromtSelect<T = void> {
  label: string
  value: T extends void ? string : T
  hint?: string
}

export type TemplateCSSStyle = 'unocss' | 'css' | 'tailwind'

export interface IExecFileException extends Omit<ExecException, 'code'>, Omit<NodeJS.ErrnoException, 'code'> { code?: string | number | undefined | null }

export interface IPackageManagerAndCwd {
  packageManager: PackageManager
  cwd: string
}

export interface IDownloadTemplate {
  cwd: string
  name: TemplatesName
}

export interface PackageVersion {
  version: string
  dev?: boolean
}

export interface StylePackage {
  name: string
  packages: Record<string, string | PackageVersion>
}

export interface PackageResult {
  dependencies: string[]
  devDependencies: string[]
}

export interface AdditionalPackages {
  typescript: Record<string, string | PackageVersion>
  style: Record<TemplateCSSStyle, StylePackage>
}

export interface IInstallDependencies extends IPackageManagerAndCwd {
  additional: {
    typescript: boolean
    css: TemplateCSSStyle
  }
}

export interface ITransformPackagesSource {
  source: Record<string, any> | StylePackage[] | PackageVersion | string
  result: PackageResult
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

export type TemplatesName = 'v3' | 'v4'
