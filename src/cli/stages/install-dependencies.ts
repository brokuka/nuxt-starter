import { spinner } from '@clack/prompts'
import type { IInstallDependencies } from 'src/utils/types'
import { installPackage } from '@antfu/install-pkg'
import { ADDITIONAL_PACKAGES, BASIC_PACKAGES, PROMT_TEXT } from '../../utils/constants'
import { transformObjectToArray } from '../../utils/common'

export default async function installDependencies({ packageManager, cwd, typescript }: IInstallDependencies) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_dependencies)

  const additionalPackages = transformObjectToArray(ADDITIONAL_PACKAGES)
  const pkgArray = transformObjectToArray(BASIC_PACKAGES)
  const mergePackages = [...pkgArray, ...additionalPackages]

  const getPackagesArrayByTS = typescript ? mergePackages : pkgArray

  await installPackage(getPackagesArrayByTS, { cwd, packageManager, silent: true, dev: true })

  s.stop(PROMT_TEXT.end_install_dependencies)
}
