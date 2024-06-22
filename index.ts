import process from 'node:process'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import * as p from '@clack/prompts'
import c from 'picocolors'
import { execa } from 'execa'
import { makeBaseStructure } from './src/utils/stages/make-base-structure'
import { installNuxt } from './src/utils/stages/install-nuxt'
import { PROMT_FOLDER_CHOOSE, PROMT_STRUCTURE_CONFIRM, PROMT_STYLES_SELECT, PROMT_TEXT } from './src/utils/constants'

// Current directory name
const __dirname = dirname(fileURLToPath(import.meta.url)).replace(/^.*\\/, '')

const cwd = process.cwd()
const baseSrcPath = path.join(cwd, 'src')

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

  // First stage
  await installNuxt()

  p.outro('Happy hacking ;)')
}

main()
