import c from 'picocolors'
import type { IPromtSelect, IPromtTextGroup, TemplateCSSStyle } from './types'

export const OWNER = 'brokuka'
export const TEMPLATES_REPO = 'nuxt-templates'

export const BASIC_PACKAGES = {
  'nuxt': 'latest',
  '@antfu/eslint-config': 'latest',
  '@nuxt/eslint': 'latest',
  'eslint-plugin-format': 'latest',
  'eslint': 'latest',
  'template-copyright': 'latest',
} as const

export const ADDITIONAL_PACKAGES = {
  typescript: {
    'typescript': 'latest',
    'vue-tsc': 'latest',
  },
  unocss: {
    '@unocss/eslint-plugin': 'latest',
    '@unocss/nuxt': 'latest',
    'unocss': 'latest',
  },
} as const

export const PROMT_TEXT = {
  select_package_manager: c.blue('Choose package manager for project'),
  cancel_install: 'Installation cancelled',
  start_download_template: 'Downloading clean template',
  end_download_template: 'Template downloaded successfully',
  start_install_dependencies: 'Installing project dependencies',
  end_install_dependencies: 'Successfully installed project dependencies',
  start_nuxt_prepare: 'Almost done, need to prepare',
  start_make_base_structure: 'Starting making base structure',
  select_nuxt_version: 'Choose NUXT version',
  select_css_styles: 'Choose your CSS style',
  select_project_template: c.blue('Select project template'),
  confirm_unocss: c.blue('Do you want to add UnoCSS?'),
  confirm_typescript: c.blue('Do you want to add TypeScript?'),
  confirm_git: c.blue('Initialize git?'),
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

export const PROMT_NUXT_VERSION_SELECT = [
  { value: 'v3', label: 'v3', hint: c.cyan('default') },
  // TODO: adding v4 templates
] satisfies IPromtSelect[]

export const PROMT_CSS_STYLE_SELECT = [
  { value: 'css', label: 'Vanilla', hint: c.cyan('default') },
  { value: 'unocss', label: 'UnoCSS' },
  { value: 'tailwind', label: 'Tailwind' },
] satisfies IPromtSelect<TemplateCSSStyle>[]

export const PROMT_TEMPLATE_SELECT = [
  { value: 'v3', label: 'v3', hint: c.cyan('default') },
  { value: '@brokuka', label: '@brokuka\'s' },
  { value: 'v3-unocss', label: 'UnoCSS', hint: c.cyan('default') },
  { value: 'v3-unocss-shadcn', label: 'UnoCSS + shadcn/ui' },
  { value: 'v3-tailwind', label: 'Tailwind' },
] satisfies IPromtSelect[]
