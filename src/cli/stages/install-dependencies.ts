import { spinner } from '@clack/prompts'
import type { IPackageManagerAndCwd } from 'src/utils/types'
import { installPackage } from '@antfu/install-pkg'
import { NUXT_PACKAGES, PROMT_TEXT } from '../../utils/constants'
import { transformObjectToArray } from '../../utils/common'

export default async function installDependencies({ packageManager, cwd }: IPackageManagerAndCwd) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_dependencies)

  const pkgArray = transformObjectToArray(NUXT_PACKAGES)
  await installPackage(pkgArray, { cwd, packageManager, silent: true })

  s.stop(PROMT_TEXT.end_install_dependencies)
}
