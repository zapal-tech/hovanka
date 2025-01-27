import { sveltePrettierConfig } from '@zapal/dx/prettier'

export default {
  ...sveltePrettierConfig,
  importOrderTypeScriptVersion: '5.6.2',
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(@zapal)(/.*)$',
    '',
    '^(\\$app|\\$env|\\$lib|\\$service-worker)(/.*)?$',
    '',
    '^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
}
