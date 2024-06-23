import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../constants'
import { execCmd } from '../common'

export default async function postInstall() {
  const s = spinner()

  s.start(PROMT_TEXT.start_nuxt_prepare)

  await execCmd('nr postinstall')

  s.stop(PROMT_TEXT.end_install)
}
