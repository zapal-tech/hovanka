import { sveltePrettierConfig } from '@zapal/dx/prettier'

export default {
  ...sveltePrettierConfig,
  importOrderTypeScriptVersion: '5.6.2',
  importOrder: [
    '<BUILTIN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^(@hovanka)(?!/shared)(/.*)$',
    '',
    '^(@hovanka/shared)(/.*)?$',
    '^(@hovanka/ui)(/.*)?$',
    '',
    '^(@cms|@cms-config)(/.*)?$',
    '',
    '^(\\$app|\\$env|\\$lib|\\$service-worker)(/.*)?$',
    '',
    '^[.]',
    '',
    '^(?!.*[.]css$)[./].*$',
    '.css$',
  ],
  plugins: [...sveltePrettierConfig.plugins, 'prettier-plugin-tailwindcss'],
}
