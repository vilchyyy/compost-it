import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { registerRouter } from "./register";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  register: registerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
