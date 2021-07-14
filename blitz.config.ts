import { BlitzConfig, sessionMiddleware, simpleRolesIsAuthorized } from "blitz"

const config: BlitzConfig = {
  middleware: [
    sessionMiddleware({
      cookiePrefix: "strove",
      isAuthorized: simpleRolesIsAuthorized,
    }),
  ],
}

module.exports = config
