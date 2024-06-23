import { spinner } from '@clack/prompts'
import type { PackageManager, PackageManagerName } from 'nypm'
import { PROMT_TEXT } from '../constants'
import { addPackage } from '../common'

export const NUXT_PACKAGES = {
  'nuxt': 'latest',
  'vue': 'latest',
  'vue-router': 'latest',
  '@antfu/eslint-config': 'latest',
  '@nuxt/eslint': 'latest',
  'eslint-plugin-format': 'latest',
} as const

export default async function installDependencies(pkgInfo?: PackageManager) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_dependencies)

  await addPackage({ source: NUXT_PACKAGES, pkgManager: pkgInfo?.name ?? 'npm' })

  s.stop(PROMT_TEXT.end_install_dependencies)
}
