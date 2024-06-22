import type { ExecException } from 'node:child_process'

export interface IPromtTextGroup {
  message: string
  placeholder?: string
}

export interface IPromtSelect {
  label: string
  value: string
  hint?: string
}

export interface IExecFileException extends Omit<ExecException, 'code'>, Omit<NodeJS.ErrnoException, 'code'> { code?: string | number | undefined | null }
