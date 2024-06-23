import { spinner } from '@clack/prompts'
import type { IPackageManagerAndCwd } from 'src/utils/types'
import { PROMT_TEXT } from '../../utils/constants'
import { execCmd } from '../../utils/common'

export default async function postInstall({ cwd, packageManager }: IPackageManagerAndCwd) {
  const s = spinner()

  s.start(PROMT_TEXT.start_nuxt_prepare)

  await execCmd(`${packageManager} run postinstall`, cwd)

  s.stop(PROMT_TEXT.end_install)
}
