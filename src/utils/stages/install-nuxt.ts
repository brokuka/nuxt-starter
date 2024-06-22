import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../constants'
import { execCmd } from '../common'

export async function installNuxt(destination: string) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await execCmd(`npx nuxi@latest init ${destination}`)

  s.stop()
}
