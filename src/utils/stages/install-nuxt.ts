import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../constants'
import { addPackage } from '../common'

export const NUXT_PACKAGES = {
  'nuxt': 'latest',
  'vue': 'latest',
  'vue-router': 'latest',
} as const

export async function installNuxt() {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await addPackage(NUXT_PACKAGES)

  s.stop(PROMT_TEXT.end_install)
}
