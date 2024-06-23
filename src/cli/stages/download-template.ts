import { spinner } from '@clack/prompts'
import { PROMT_TEXT } from '../../utils/constants'
import { execCmd } from '../../utils/common'

interface IDownloadTemplate {
  destination: string
}

export default async function downloadTemplate({ destination }: IDownloadTemplate) {
  const s = spinner()

  s.start(PROMT_TEXT.start_download_template)

  await execCmd(`npx giget@latest gh:brokuka/nuxt-starter/template ${destination}`)

  s.stop(PROMT_TEXT.end_download_template)
}
