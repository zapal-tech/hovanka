import { defaultPrettierConfig } from '@zapal/dx/prettier'

export default {
  ...defaultPrettierConfig,
  importOrderTypeScriptVersion: '5.6.2',
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(@hovanka)(?!/shared)(/.*)$',
    '',
    '^@hovanka/shared(/.*)?$',
    '',
    '^(@api|@api-config)(/.*)?$',
    '',
    '^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
}
