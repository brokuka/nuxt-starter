import { spinner } from '@clack/prompts'
import { makeFolder } from '../common'
import { BASIC_STRUCTURE, PROMT_TEXT } from '../constants'

export function makeBaseStructure(directory: string) {
  const s = spinner()

  s.start(PROMT_TEXT.start_make_base_structure)

  for (const path in BASIC_STRUCTURE) {
    makeFolder(`${directory}/${path}`, error => console.log(error))
  }

  s.stop()
}
