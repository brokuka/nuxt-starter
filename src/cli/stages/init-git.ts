import { execCmd } from 'src/utils/common'

export default async function initGit(cwd: string) {
  await execCmd('git init', cwd)
}
