import { spinner } from '@clack/prompts'
import type { IDownloadTemplate } from 'src/utils/types'
import { PROMT_TEXT } from '../../utils/constants'
import { execCmd } from '../../utils/common'

export default async function downloadTemplate({ destination, name }: IDownloadTemplate) {
  const s = spinner()

  s.start(PROMT_TEXT.start_download_template)

  await execCmd(`npx giget@latest gh:brokuka/nuxt-templates#${name} ${destination}`)

  s.stop(PROMT_TEXT.end_download_template)
}
