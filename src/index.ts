import process from 'node:process'
import type { ExecFileException } from 'node:child_process'
import * as p from '@clack/prompts'
import type { PackageManager } from '@antfu/install-pkg'
import installDependencies from './cli/stages/install-dependencies'
import { PROMT_FOLDER_CHOOSE, PROMT_PACKAGE_MANAGER_SELECT, PROMT_TEXT } from './utils/constants'
import downloadTemplate from './cli/stages/download-template'
import postInstall from './cli/stages/post-install'

async function main() {
  const defaultFolderName = __dirname.replace(/.*\\([^\\]+)$/, '$1')

  const group = await p.group({
    packageManager: () => p.select({
      message: PROMT_TEXT.select_package_manager,
      options: PROMT_PACKAGE_MANAGER_SELECT,
      initialValue: 'npm',
    }),
    folderName: () => p.text({
      ...PROMT_FOLDER_CHOOSE,
      defaultValue: defaultFolderName,
    }),
    // styles: () => p.select({
    //   message: PROMT_TEXT.select_css_styles,
    //   // @ts-expect-error * BUG *
    //   // ! https://github.com/bombshell-dev/clack/issues/178
    //   options: PROMT_STYLES_SELECT,
    // }),
    // default_structure: () => p.confirm(PROMT_STRUCTURE_CONFIRM),
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

    await installDependencies({
      packageManager: group.packageManager as PackageManager,
      cwd: group.folderName,
    })

    await postInstall({
      cwd: group.folderName,
      packageManager: group.packageManager as PackageManager,
    })
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
