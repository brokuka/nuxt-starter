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
  const group = await p.group({
    packageManager: () => p.select({
      message: PROMT_TEXT.select_package_manager,
      options: PROMT_PACKAGE_MANAGER_SELECT,
      initialValue: 'npm',
    }),
    folderName: () => p.text({
      ...PROMT_FOLDER_CHOOSE,
    }),
    template: () => p.select({
      message: PROMT_TEXT.select_project_template,
      options: PROMT_TEMPLATE_SELECT,
      initialValue: 'v3',
    }),
    git: () => p.confirm({
      message: PROMT_TEXT.git_confirm,
    }),
  }, {
    onCancel: () => {
      p.cancel(PROMT_TEXT.cancel_install)
      process.exit(0)
    },
  })

  const defaultFolderName = group.folderName === PROMT_FOLDER_CHOOSE.defaultValue ? '.' : group.folderName

  try {
    await downloadTemplate({
      destination: defaultFolderName,
      name: group.template as TemplatesName,
    })

    await installDependencies({
      packageManager: group.packageManager as PackageManager,
      cwd: defaultFolderName,
    })

    await postInstall({
      cwd: defaultFolderName,
      packageManager: group.packageManager as PackageManager,
    })

    if (group.git) {
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
