import fs from 'node:fs'
import { text } from '@clack/prompts'
import type { IPromtTextGroup } from './types'

export function makeFolder(path: string, cb: fs.NoParamCallback) {
  return fs.mkdir(path, { recursive: true }, cb)
}

export function createPromtText(key: string, params: IPromtTextGroup) {
  return {
    [key]: () => text(params),
  }
}
