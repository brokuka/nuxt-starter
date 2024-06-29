import c from 'picocolors'
import type { IPromtSelect, IPromtTextGroup } from './types'

export const BASIC_PACKAGES = {
  'nuxt': 'latest',
  '@antfu/eslint-config': 'latest',
  '@nuxt/eslint': 'latest',
  'eslint-plugin-format': 'latest',
  'eslint': 'latest',
} as const

export const ADDITIONAL_PACKAGES = {
  'typescript': 'latest',
  'vue-tsc': 'latest',
} as const

export const PROMT_TEXT = {
  select_package_manager: 'Choose package manager for project',
  cancel_install: 'Installation cancelled',
  start_download_template: 'Downloading clean template',
  end_download_template: 'Template downloaded successfully',
  start_install_dependencies: 'Installing project dependencies',
  end_install_dependencies: 'Successfully installed project dependencies',
  start_nuxt_prepare: 'Almost done, need to prepare',
  start_make_base_structure: 'Starting making base structure',
  select_css_styles: 'Choose your css style',
  select_project_template: 'Select project template',
  confirm_typescript: 'Do you want to add typescript?',
  confirm_git: 'Initialize git?',
  end_install: 'Happy hacking ;)',
}

export const PROMT_FOLDER_CHOOSE = {
  message: c.blue('What\'s your folder name ?'),
  placeholder: `Enter folder name ${c.cyan(`(press ENTER if it\'s ${c.underline('Current folder')})`)}`,
  defaultValue: 'Current folder',
} satisfies IPromtTextGroup

export const BASIC_STRUCTURE = {
  styles: 'assets/styles',
  middleware: 'middleware',
}

export const PROMT_PACKAGE_MANAGER_SELECT = [
  { value: 'npm', label: 'npm' },
  { value: 'yarn', label: 'yarn' },
  { value: 'pnpm', label: 'pnpm' },
  { value: 'bun', label: 'bun' },
] satisfies IPromtSelect[]

export const PROMT_STYLES_SELECT = [
  { value: 'scss', label: c.red('SCSS') },
  { value: 'uno', label: 'Uno CSS', hint: c.cyan('best option') },
] satisfies IPromtSelect[]

export const PROMT_TEMPLATE_SELECT = [
  { value: 'v3', label: 'v3', hint: c.cyan('default') },
  { value: '@brokuka', label: '@brokuka\'s' },
] satisfies IPromtSelect[]
