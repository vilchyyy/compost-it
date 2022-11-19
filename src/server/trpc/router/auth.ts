import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
  getCurrUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findFirstOrThrow({ where: {id: ctx.session.user.id} }).catch();
  })
});
