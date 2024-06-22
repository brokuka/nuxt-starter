import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../constants'
import { execCmd } from '../common'

export async function installNuxt() {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  execCmd('npx nuxi@latest init .')

  s.stop()
}
