import c from 'picocolors'
import type { IPromtSelect, IPromtTextGroup } from './types'

export const PROMT_TEXT = {
  cancel_install: 'Installation cancelled',
  start_download_template: 'Downloading clean template',
  start_install_nuxt: 'Starting installing nuxt to current folder',
	start_nuxt_prepare: 'Almost done, need to prepare',
  start_make_base_structure: 'Starting making base structure',
  select_css_styles: 'Choose your css style',
  end_install: 'Happy hacking ;)',
}

export const PROMT_FOLDER_CHOOSE = {
  message: c.blue('What\'s your folder name ?'),
  placeholder: `Enter folder name ${c.cyan('(press ENTER if it\'s current folder)')}`,
} satisfies IPromtTextGroup

export const BASIC_STRUCTURE = {
  styles: 'assets/styles',
  middleware: 'middleware',
}

export const PROMT_STYLES_SELECT = [
  { value: 'scss', label: c.red('SCSS') },
  { value: 'uno', label: 'Uno CSS', hint: c.cyan('best option') },
] satisfies IPromtSelect[]

export const PROMT_STRUCTURE_CONFIRM = {
  message: 'Use default folder structure?',
}
