import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { listingRouter } from "./listing";
import { registerRouter } from "./register";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  register: registerRouter,
  listing: listingRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
