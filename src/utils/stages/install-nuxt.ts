import { spinner } from '@clack/prompts'
import type { PackageManagerName } from 'nypm'
import { PROMT_TEXT } from '../constants'
import { addPackage } from '../common'

export const NUXT_PACKAGES = {
  'nuxt': 'latest',
  'vue': 'latest',
  'vue-router': 'latest',
} as const

interface IInstallNuxtProps {
  pkgManager?: PackageManagerName
}

export async function installNuxt({ pkgManager }: IInstallNuxtProps) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await addPackage(NUXT_PACKAGES, pkgManager)

  s.stop(PROMT_TEXT.end_install)
}
