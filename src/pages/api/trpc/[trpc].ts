import { createNextApiHandler } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse} from "next"
import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";
import cors from "nextjs-cors"
// export API handler

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{

  cors(req, res, {
    allowedHeaders: [],

  /** Configures the Cache-Control header for the preflight response. */
  cacheControl: "max-age: 300",

  /** Configures the Access-Control-Allow-Credentials CORS header. */
  allowCredentials: true,

  /** Configures the Access-Control-Expose-Headers CORS header. */
  exposedHeaders: ["X-Custom-Header"],

  /** Configures the Access-Control-Max-Age CORS header. */
  maxAge: 300,

  /** Configures the Access-Control-Allow-Methods CORS header. */
  allowedMethods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],

  /** Provides a status code to use for successful OPTIONS requests, since some legacy browsers (IE11, various SmartTVs) choke on 204. */
  optionsSuccessStatus: 204,

  /** Configures the Access-Control-Allow-Origin CORS header. An empty array will set the header to '*'. */
  allowedOrigins: "*",

  /** Whether to call the next middleware or handler in case of a OPTIONS request. */
  preflightContinue: false,
  })


return createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(`❌ tRPC failed on ${path}: ${error}`);
        }
      : undefined,
})(req, res);

}
export default handler;