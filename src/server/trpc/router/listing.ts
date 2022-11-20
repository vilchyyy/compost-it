import { z } from "zod";
import { validationSchema } from "../../../pages/listing/new";
import { validationSchemaEdit } from "../../../pages/listing/edit";
import { router, protectedProcedure } from "../trpc";


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
    return ctx.prisma.listing.findMany({where: {id: ctx.session.user.id}})
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
