import { spinner } from '@clack/prompts'
import type { IInstallDependencies } from 'src/utils/types'
import { installPackage } from '@antfu/install-pkg'
import { ADDITIONAL_PACKAGES, BASIC_PACKAGES, PROMT_TEXT } from '../../utils/constants'
import { transformObjectToArray } from '../../utils/common'

export default async function installDependencies({ packageManager, cwd, additional }: IInstallDependencies) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_dependencies)

  let additionalPackages: string[] = []

  if (additional.typescript) {
    additionalPackages = transformObjectToArray(ADDITIONAL_PACKAGES.typescript)
  }

  if (additional.unocss) {
    additionalPackages = transformObjectToArray(ADDITIONAL_PACKAGES.unocss)
  }

  const pkgArray = transformObjectToArray(BASIC_PACKAGES)
  const mergedPackages = [...pkgArray, ...additionalPackages]

  await installPackage(mergedPackages, { cwd, packageManager, silent: true, dev: true })

  s.stop(PROMT_TEXT.end_install_dependencies)
}
