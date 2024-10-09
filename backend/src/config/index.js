import { configDotenv } from 'dotenv'

configDotenv()

const serverPort = process.env.PORT || 8000
const dbUrl = process.env.DATABASE_URL

// email transporter info
const host = process.env.HOST
const userEmail = process.env.USER_EMAIL
const userEmailPassword = process.env.USER_EMAIL_PASSWORD

// jwt token env variable
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const accessTokenExpires = process.env.ACCESS_TOKEN_EXPIRES
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET
const refreshTokenExpires = process.env.REFRESH_TOKEN_EXPIRES

const apiUrl = process.env.API_URL

export {
  serverPort,
  dbUrl,
  host,
  userEmail,
  userEmailPassword,
  accessTokenSecret,
  accessTokenExpires,
  refreshTokenSecret,
  refreshTokenExpires,
  apiUrl,
}
