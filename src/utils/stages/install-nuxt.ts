import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../constants'
import { addPackage, execCmd } from '../common'

export const NUXT_PACKAGES = {
  'nuxt': 'latest',
  'vue': 'latest',
  'vue-router': 'latest',
	'@antfu/eslint-config': 'latest',
	'eslint': 'latest',
	'eslint-plugin-format': 'latest'
} as const

export const NUXT_MODULES = {
  'eslint': 'latest',
} as const

interface IInstallNuxtProps {
  destination: string
}

export async function installNuxt({ destination }: IInstallNuxtProps) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_nuxt)

  await execCmd(`nlx giget@latest gh:brokuka/nuxt-starter/template ${destination}`)

  await addPackage(NUXT_PACKAGES)
  await execCmd('nr postinstall')

  s.stop(PROMT_TEXT.end_install)
}
