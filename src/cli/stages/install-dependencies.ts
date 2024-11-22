import { spinner } from '@clack/prompts'
import type { IInstallDependencies, PackageResult, PackageVersion } from 'src/utils/types'
import { installPackage } from '@antfu/install-pkg'
import { ADDITIONAL_PACKAGES, BASIC_PACKAGES, PROMT_TEXT } from '../../utils/constants'
import { transformObjectToArray } from '../../utils/common'

export default async function installDependencies({ packageManager, cwd, additional }: IInstallDependencies) {
  const s = spinner()

  s.start(PROMT_TEXT.start_install_dependencies)

  const packages: PackageResult = { dependencies: [], devDependencies: [] }

  const processPackageGroup = (packageGroup: Record<string, string | PackageVersion>) => {
    const result = transformObjectToArray(packageGroup)

    packages.dependencies.push(...result.dependencies)
    packages.devDependencies.push(...result.devDependencies)
  }

  processPackageGroup(BASIC_PACKAGES)

  if (additional.typescript) {
    processPackageGroup(ADDITIONAL_PACKAGES.typescript)
  }

  if (additional.css) {
    const stylePackage = ADDITIONAL_PACKAGES.style.find(
      style => style.name === additional.css,
    )

    if (stylePackage) {
      processPackageGroup(stylePackage.packages)
    }
  }

  await installPackage(packages.devDependencies, { cwd, packageManager, silent: true, dev: true })

  if (packages.dependencies.length) {
    await installPackage(packages.dependencies, { cwd, packageManager, silent: true })
  }

  s.stop(PROMT_TEXT.end_install_dependencies)
}
