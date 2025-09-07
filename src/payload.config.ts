import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import { Conferences } from './collections/Conferences'
import { Divisions } from './collections/Divisions'
import { Games } from './collections/Games'
import { Locations } from './collections/Locations'
import { Media } from './collections/Media'
import { Officials } from './collections/Officials'
import { Players } from './collections/Players'
import { Seasons } from './collections/Seasons'
import { Sessions } from './collections/Sessions'
import { Teams } from './collections/Teams'

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Conferences,
    Divisions,
    Games,
    Locations,
    Media,
    Officials,
    Players,
    Seasons,
    Sessions,
    Teams,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
})
