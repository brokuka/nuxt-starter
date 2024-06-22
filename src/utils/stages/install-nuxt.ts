import { spinner } from '@clack/prompts'
import { execa } from 'execa'
import { PROMT_TEXT } from '../constants'

export async function installNuxt() {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await execa`npx nuxi@latest init .`

  s.stop()
}
