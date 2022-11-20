import { createNextApiHandler } from "@trpc/server/adapters/next";
import { NextApiRequest, NextApiResponse} from "next"
import { env } from "../../../env/server.mjs";
import { createContext } from "../../../server/trpc/context";
import { appRouter } from "../../../server/trpc/router/_app";
import NextCors from "nextjs-cors"
// export API handler

const handler = async (req: NextApiRequest, res: NextApiResponse)=>{

  NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: '*',
  })
 req.headers["access-control-allow-origin"]="*"

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