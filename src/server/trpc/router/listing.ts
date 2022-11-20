import { string, z } from "zod";
import { validationSchema } from "../../../pages/listing/new";
import { validationSchemaEdit } from "../../../pages/listing/edit";
import { router, protectedProcedure, publicProcedure } from "../trpc";


export const listingRouter = router({
  addListing: protectedProcedure
    .input(validationSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listing.create({
        data: {
            ...input,
            userId: ctx.session.user.id,
        }

      })
    }),
  getSelfListings: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany({where: {userId: ctx.session.user.id}})
  }),
  getAllListings: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.listing.findMany({
      include: {
        owner: true,
      }
    })
  }),
  getOneById: publicProcedure.input(z.object({ id: z.string()  })).query(({ input, ctx }) => {
    return ctx.prisma.listing.findFirstOrThrow({ where: {id: input?.id} })
  })
//     editListing: protectedProcedure
//         .input(validationSchema)
//         .mutation(({ input, ctx }) => {
//             return ctx.prisma.listing.update({
//                 data : {
//                     ...input,
//                 },
//                 where: {id: }})
//         })
});
