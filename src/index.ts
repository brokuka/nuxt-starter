import process from 'node:process'
import type { ExecFileException } from 'node:child_process'
import { detectPackageManager } from 'nypm'
import * as p from '@clack/prompts'
import { installNuxt } from './utils/stages/install-nuxt'
import { PROMT_FOLDER_CHOOSE, PROMT_STRUCTURE_CONFIRM, PROMT_STYLES_SELECT, PROMT_TEXT } from './utils/constants'
import downloadTemplate from './utils/stages/download-template'
import postInstall from './utils/stages/post-install'

const cwd = process.cwd()

async function main() {
  const pkgInfo = await detectPackageManager(cwd)

  const group = await p.group({
    folderName: () => p.text({
      ...PROMT_FOLDER_CHOOSE,
      defaultValue: '.',
    }),
    styles: () => p.select({
      message: PROMT_TEXT.select_css_styles,
      // @ts-expect-error * BUG *
      // ! https://github.com/bombshell-dev/clack/issues/178
      options: PROMT_STYLES_SELECT,
    }),
    default_structure: () => p.confirm(PROMT_STRUCTURE_CONFIRM),
  }, {
    onCancel: () => {
      p.cancel(PROMT_TEXT.cancel_install)
      process.exit(0)
    },
  })

  try {
    await downloadTemplate({
      destination: group.folderName,
    })

    await installNuxt(pkgInfo)

    await postInstall()
  }
  catch (error) {
    const exectError = error as ExecFileException

    if (exectError.stderr) {
      p.cancel(exectError.stderr)
    }
    process.exit(0)
  }
}

main()
