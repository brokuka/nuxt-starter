import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../constants'
import { addPackage } from '../common'
import downloadTemplate from './download-template'
import postInstall from './post-install'

export const NUXT_PACKAGES = {
  'nuxt': 'latest',
  'vue': 'latest',
  'vue-router': 'latest',
  '@antfu/eslint-config': 'latest',
  'eslint': 'latest',
  'eslint-plugin-format': 'latest',
} as const

export const NUXT_MODULES = {
  eslint: 'latest',
} as const

export async function installNuxt() {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await addPackage(NUXT_PACKAGES)

  s.stop()
}
