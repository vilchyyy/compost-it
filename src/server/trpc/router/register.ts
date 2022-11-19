import { z } from "zod";
import { validationSchema } from "../../../pages/register";

import { router, protectedProcedure } from "../trpc";

export const registerRouter = router({
  fillMissingData: protectedProcedure
    .input(validationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({ 
        where: {
            id: ctx.session.user.id
        },
        data: {
            ...input
        }
       })
    }),
});
