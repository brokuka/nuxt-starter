import process from 'node:process'
import type { ExecFileException } from 'node:child_process'
import * as p from '@clack/prompts'
import type { PackageManager } from '@antfu/install-pkg'
import c from 'picocolors'
import installDependencies from './cli/stages/install-dependencies'
import { PROMT_CSS_STYLE_SELECT, PROMT_FOLDER_CHOOSE, PROMT_NUXT_VERSION_SELECT, PROMT_PACKAGE_MANAGER_SELECT, PROMT_TEMPLATE_SELECT, PROMT_TEXT } from './utils/constants'
import downloadTemplate from './cli/stages/download-template'
import postInstall from './cli/stages/post-install'
import initGit from './cli/stages/init-git'
import type { TemplateCSSStyle, TemplatesName } from './utils/types'
import { getAbsolutePath } from './utils/common'

async function main() {
  const initialValues = {
    packageManager: 'npm',
    version: 'v3',
    style: 'css',
  }

  p.intro(c.inverse(' nuxt-starter '))

  const defaultSettings = await p.group({
    packageManager: () => p.select({
      message: PROMT_TEXT.select_package_manager,
      options: PROMT_PACKAGE_MANAGER_SELECT,
      initialValue: initialValues.packageManager,
    }),
    folderName: () => p.text({
      ...PROMT_FOLDER_CHOOSE,
    }),
    version: () => p.select({
      message: PROMT_TEXT.select_nuxt_version,
      options: PROMT_NUXT_VERSION_SELECT,
      initialValue: initialValues.version,
    }),
    style: () => p.select({
      message: PROMT_TEXT.select_css_styles,
      options: PROMT_CSS_STYLE_SELECT,
      initialValue: initialValues.style,
    }),
  }, {
    onCancel: () => {
      p.cancel(PROMT_TEXT.cancel_install)
      process.exit(0)
    },
  })

  const choosedVersion = defaultSettings.version
  const choosedStyle = defaultSettings.style as TemplateCSSStyle

  const options = (() => {
    if (choosedStyle !== 'css') {
      return PROMT_TEMPLATE_SELECT.filter(option => option.value.includes(defaultSettings.style))
    }

    return PROMT_TEMPLATE_SELECT.filter(option => option.value === defaultSettings.version)
  })()

  const templateInitialValue = (() => {
    if (choosedStyle !== 'css') {
      return `${choosedVersion}-${choosedStyle}`
    }

    return choosedVersion
  })()

  const additionalSettings = await p.group({
    template: () => {
      if (options.length > 1) {
        return p.select({
          message: PROMT_TEXT.select_project_template,
          options,
          initialValue: templateInitialValue,
        })
      }
    },
    typescript: () => p.confirm({
      message: PROMT_TEXT.confirm_typescript,
    }),
    git: () => p.confirm({
      message: PROMT_TEXT.confirm_git,
    }),
  })

  const cwd = defaultSettings.folderName === PROMT_FOLDER_CHOOSE.defaultValue ? '.' : getAbsolutePath(defaultSettings.folderName)
  const packageManager = defaultSettings.packageManager as PackageManager

  try {
    await downloadTemplate({
      cwd,
      name: additionalSettings.template as TemplatesName,
    })

    await installDependencies({
      packageManager,
      cwd,
      additional: {
        typescript: additionalSettings.typescript,
        unocss: choosedStyle === 'unocss',
      },
    })

    await postInstall({
      cwd,
      packageManager,
    })

    if (additionalSettings.git) {
      await initGit(cwd)
    }
  }
  catch (error) {
    const exectError = error as ExecFileException
    const defaultError = error as Error

    if (exectError.stderr) {
      p.cancel(exectError.stderr)
    }

    if (defaultError) {
      p.cancel(defaultError.message)
    }

    process.exit(0)
  }
}

main()
