import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../../utils/constants'
import { execCmd } from '../../utils/common'

export default async function postInstall(cwd: string) {
  const s = spinner()

  s.start(PROMT_TEXT.start_nuxt_prepare)

  await execCmd('nr postinstall', cwd)

  s.stop(PROMT_TEXT.end_install)
}
