import process from 'node:process'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import type { ExecException, ExecFileException } from 'node:child_process'
import * as p from '@clack/prompts'
import { installNuxt } from './utils/stages/install-nuxt'
import { PROMT_FOLDER_CHOOSE, PROMT_STRUCTURE_CONFIRM, PROMT_STYLES_SELECT, PROMT_TEXT } from './utils/constants'

// Current directory name
const __dirname = dirname(fileURLToPath(import.meta.url)).replace(/^.*\\/, '')

// const cwd = process.cwd()
// const baseSrcPath = path.join(cwd, 'src')

async function main() {
  const group = await p.group({
    folderName: () => p.text({
      ...PROMT_FOLDER_CHOOSE,
      defaultValue: __dirname,
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

  p.outro(PROMT_TEXT.end_install)

  try {
    await installNuxt(group.folderName)
  }
  catch (error) {
    // const exectError = error as ExecFileException

    // if (exectError.stderr) {
    //   p.cancel(exectError.stderr)
    // }

    process.exit(0)
  }
}

main()
