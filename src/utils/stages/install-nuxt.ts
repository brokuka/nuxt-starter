import { spinner } from '@clack/prompts'
import type { PackageManagerName } from 'nypm'
import { PROMT_TEXT } from '../constants'
import { addPackage, copyFolder, execCmd } from '../common'

export const NUXT_PACKAGES = {
  'nuxt': 'latest',
  'vue': 'latest',
  'vue-router': 'latest',
} as const

interface IInstallNuxtProps {
  pkgManager?: PackageManagerName
  destination: string
}

export async function installNuxt({ pkgManager, destination }: IInstallNuxtProps) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await execCmd(`npx giget@latest gh:brokuka/nuxt-starter/template ${destination}`)

  await addPackage(NUXT_PACKAGES, pkgManager)
  await execCmd(`nr prepare`)

  s.stop(PROMT_TEXT.end_install)
}
