import path from 'node:path'
import { fileURLToPath } from 'node:url'
// import { Collection, CollectionLabel, Global, UserRole } from '@hovanka/shared/types'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
// import { formBuilderPlugin } from '@payloadcms/plugin-form-builder';
// import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
// import { seoPlugin } from '@payloadcms/plugin-seo'
// import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig, Config } from 'payload'
import { OAuth2Plugin } from 'payload-oauth2'
import { en } from 'payload/i18n/en'
import { uk } from 'payload/i18n/uk'

import { appName } from '@hovanka/shared/app'
import { cookiesName } from '@hovanka/shared/cookies'
import { cmsSenderEmail, cmsSenderName } from '@hovanka/shared/email'
import { defaultLocale, Locale } from '@hovanka/shared/i18n'
import { Collection, UserRole } from '@hovanka/shared/types'

import { AppUsageGoals } from '@api/collections/AppUsageGoals'
import { Journals } from '@api/collections/Journals'
import { Users } from '@api/collections/Users'
import { getDefaultEditor } from '@api/editor'
import { cmsLocales } from '@api/i18n'
import { isDev } from '@api/utils/env'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const email = process.env.USER_EMAIL || 'hello@hovanka.app'
const password = process.env.USER_PASSWORD || 'hovanka'

const emailAdapter =
  isDev && process.env.SMTP_HOST && process.env.SMTP_PORT
    ? (await import('@payloadcms/email-nodemailer')).nodemailerAdapter({
        defaultFromAddress: cmsSenderEmail,
        defaultFromName: cmsSenderName,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          secure: false,
        },
      })
    : (await import('@zapal/payload-email-sendgrid')).sendGridAdapter({
        defaultFromAddress: cmsSenderEmail,
        defaultFromName: cmsSenderName,
        apiKey: process.env.SENDGRID_API_KEY || '',
      })

const dbAdapter = sqliteAdapter({
  client: {
    url: process.env.DATABASE_URL || '',
    syncUrl: process.env.DATABASE_SYNC_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
  // prodMigrations,
  migrationDir: path.resolve(__dirname, 'src', 'migrations'),
})

const payloadConfig: Config = {
  serverURL: isDev ? undefined : process.env.NEXT_PUBLIC_URL || '',
  secret: process.env.SECRET || '',
  routes: {
    admin: '/',
  },
  admin: {
    user: Collection.Users,
    components: {
      graphics: {
        Logo: {
          path: '@api/components/Logo#Logo',
        },
        Icon: {
          path: '@api/components/NavLogo#NavLogo',
        },
      },
    },
    dateFormat: 'dd.MM.yyyy HH:mm:ss',
    meta: {
      icons: [
        {
          type: 'image/x-icon',
          rel: 'icon',
          url: '/favicon.svg',
        },
      ],
      openGraph: {
        siteName: appName,
      },
      description: 'Hovanka CMS | CMS for Hovanka PoC',
      keywords: 'Hovanka, Zapal, PoC, proof of concept, CMS, Content Management System',
      titleSuffix: ` | ${appName} CMS`,
    },
    autoLogin: isDev
      ? {
          email,
          password,
          prefillOnly: true,
        }
      : false,
  },
  collections: [Users, Journals, AppUsageGoals],
  cookiePrefix: cookiesName,
  cors: [process.env.NEXT_PUBLIC_URL, process.env.NEXT_PUBLIC_APP_URL].filter(Boolean) as string[],
  csrf: [process.env.NEXT_PUBLIC_URL, process.env.NEXT_PUBLIC_APP_URL].filter(Boolean) as string[],
  db: dbAdapter,
  editor: getDefaultEditor(),
  email: emailAdapter,
  i18n: {
    supportedLanguages: { en, uk },
  },
  localization: {
    defaultLocale,
    fallback: false,
    locales: cmsLocales,
  },
  plugins: [
    OAuth2Plugin({
      enabled: typeof process.env.GOOGLE_CLIENT_ID === 'string' && typeof process.env.GOOGLE_CLIENT_SECRET === 'string',
      strategyName: 'google',
      useEmailAsIdentity: true,

      serverURL: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorizePath: '/oauth/google/authorize',
      callbackPath: '/oauth/google/callback',
      authCollection: Collection.Users,
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      scopes: [
        'openid',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/user.birthday.read',
      ],
      providerAuthorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
      getUserInfo: async (accessToken: string) => {
        const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${accessToken}` },
        })

        const user = await response.json()

        return {
          email: user?.email,
          firstName: user?.given_name,
          picture: user?.picture,
          sub: user?.sub,
          birthday: user?.birthday,
          locale:
            user?.locale && typeof user.locale === 'string'
              ? /^(uk|ru)-/.test(user.locale as string)
                ? Locale.Ukrainian
                : Locale.English
              : undefined,
        }
      },
      successRedirect: () => process.env.NEXT_PUBLIC_APP_URL || '',
      failureRedirect: (req, err) => {
        req.payload.logger.error(err)

        return `${process.env.NEXT_PUBLIC_APP_URL}/sign-in`
      },
    }),
    // s3Storage({
    //   bucket: process.env.S3_BUCKET_NAME || '',
    //   config: {
    //     region: process.env.S3_REGION,
    //     endpoint: process.env.S3_ENDPOINT,
    //     forcePathStyle: true,
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    //       secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    //     },
    //   },
    //   collections: {
    //     [Collection.Media]: {
    //       generateFileURL: generatePublicFileURL,
    //       prefix: 'public/media',
    //     },
    //     [Collection.OpenGraphImages]: {
    //       generateFileURL: generatePublicFileURL,
    //       prefix: 'public/open-graph-images',
    //     },
    //   },
    // }),
    // nestedDocsPlugin({
    //   collections: [Collection.Pages],
    //   generateLabel: (_, currentDoc) => currentDoc.title as string,
    //   generateURL: (docs) =>
    //     docs.reduce(
    //       (url, doc, idx) =>
    //         `${idx || typeof (doc as unknown as Page).tenant !== 'object' ? '' : `/${(doc.tenant as unknown as Tenant).slug}`}${url}/${(doc as unknown as Page).slug}`,
    //       '',
    //     ),
    // }),
    // seoPlugin({
    //   globals: [Global.Home],
    //   collections: [Collection.Pages, Collection.Posts],
    //   generateTitle,
    //   uploadsCollection: Collection.OpenGraphImages,
    // }),
  ],
  async onInit(payload) {
    if (isDev) {
      const existingUsers = await payload.find({ collection: Collection.Users, limit: 1 })
      if (existingUsers.docs.length === 0) {
        await payload.create({
          collection: Collection.Users,
          data: {
            email,
            password,
            firstName: 'Hovanka',
            roles: [UserRole.Root],
          },
        })
      }
    }
  },
  telemetry: false,
  typescript: { outputFile: path.resolve(__dirname, 'src', 'types', 'generated-types.ts') },
}

export default buildConfig(payloadConfig)
