import mongoose from 'mongoose'

// Vercel serverless functions are stateless — each function invocation may be
// a fresh Node.js process. We use a global cache to reuse the connection
// across invocations within the same process lifetime.

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined
}

// Initialise cache on this process
if (!global._mongooseCache) {
  global._mongooseCache = { conn: null, promise: null }
}

const cache = global._mongooseCache

export async function dbConnect(): Promise<typeof mongoose> {
  // Already connected — return immediately
  if (cache.conn && mongoose.connection.readyState === 1) {
    return cache.conn
  }

  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is not defined in .env.local')

  // If a connection is already in flight, wait for it
  if (!cache.promise) {
    cache.promise = mongoose.connect(uri, {
      bufferCommands: false,
      maxPoolSize: 10,          // keep up to 10 connections in the pool
      serverSelectionTimeoutMS: 10000, // fail fast — 10s
      socketTimeoutMS: 45000,   // 45s socket timeout
      connectTimeoutMS: 10000,  // 10s initial connect
      retryWrites: true,
      retryReads: true,
    }).then((m) => {
      cache.conn = m
      return m
    }).catch((err) => {
      // Reset so next request tries again
      cache.promise = null
      cache.conn = null
      throw err
    })
  }

  cache.conn = await cache.promise
  return cache.conn
}
