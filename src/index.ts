import process from 'node:process'
import type { ExecFileException } from 'node:child_process'
import * as p from '@clack/prompts'
import type { PackageManager } from '@antfu/install-pkg'
import installDependencies from './cli/stages/install-dependencies'
import { PROMT_FOLDER_CHOOSE, PROMT_PACKAGE_MANAGER_SELECT, PROMT_TEMPLATE_SELECT, PROMT_TEXT } from './utils/constants'
import downloadTemplate from './cli/stages/download-template'
import postInstall from './cli/stages/post-install'
import initGit from './cli/stages/init-git'
import type { TemplatesName } from './utils/types'

async function main() {
  const defaultSettings = await p.group({
    packageManager: () => p.select({
      message: PROMT_TEXT.select_package_manager,
      options: PROMT_PACKAGE_MANAGER_SELECT,
      initialValue: 'npm',
    }),
    folderName: () => p.text({
      ...PROMT_FOLDER_CHOOSE,
    }),
    unocss: () => p.confirm({
      message: PROMT_TEXT.confirm_unocss,
    }),
  }, {
    onCancel: () => {
      p.cancel(PROMT_TEXT.cancel_install)
      process.exit(0)
    },
  })

  const options = PROMT_TEMPLATE_SELECT.filter(
    option => option.label.toLowerCase().includes('unocss') === defaultSettings.unocss,
  )

  const initialValue = defaultSettings.unocss ? 'v3-unocss' : 'v3'

  const additionalSettings = await p.group({
    template: () => p.select({
      message: PROMT_TEXT.select_project_template,
      options,
      initialValue,
    }),
    typescript: () => p.confirm({
      message: PROMT_TEXT.confirm_typescript,
    }),
    git: () => p.confirm({
      message: PROMT_TEXT.confirm_git,
    }),
  })

  const defaultFolderName = defaultSettings.folderName || '.'
  const packageManager = defaultSettings.packageManager as PackageManager

  try {
    await Promise.all([
      downloadTemplate({
        destination: defaultFolderName,
        name: additionalSettings.template as TemplatesName,
      }),
      installDependencies({
        packageManager,
        cwd: defaultFolderName,
        additional: {
          typescript: additionalSettings.typescript,
          unocss: defaultSettings.unocss,
        },
      }),
      postInstall({
        cwd: defaultFolderName,
        packageManager,
      }),
    ])

    if (additionalSettings.git) {
      await initGit(defaultFolderName)
    }
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
