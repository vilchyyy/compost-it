import { useForm, UseFormProps } from "react-hook-form";
import { number, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";


export const validationSchemaEdit = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, { message: "Pole nie może być puste." })
    .max(30, { message: "Pole może mieć maksymalnie 30 znaków" }),
  description: z
    .string()
    .min(1, { message: "Pole nie może być puste." })
    .max(200, { message: "Pole może mieć maksymalnie 200 znaków" }),
  price: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Proszę podać liczbę",
  }),
  weight: z
    .string()
    .min(1, { message: "Pole nie może być puste." })
    .max(30, { message: "Pole może mieć maksymalnie 30 znaków" }),
  active: z.boolean(),
});

function useZodForm<TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema["_input"]>, "resolver"> & {
    schema: TSchema;
  }
) {
  const form = useForm<TSchema["_input"]>({
    ...props,
    resolver: zodResolver(props.schema, undefined),
  });

  return form;
}

const Index: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionData?.user?.name !== null) {
      //  router.push('/home')
    }
  }, []);

  const mutation = trpc.listing.addListing.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useZodForm({
    schema: validationSchemaEdit,
    defaultValues: {
      price: "",
      name: "",
      description: "",
      weight: "",
      active: true,
    },
  });
  const fields = ["price", "weight", "active"];
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg border border-gray-300 bg-white shadow-xl">
        <h1 className="my-4 text-center text-xl">Uzupełnij kilka danych</h1>
        <form
          onSubmit={handleSubmit(async (values) => {
            mutation.mutate(values);
            reset();
            //router.push('/home')
          })}
          className="flex flex-col flex-wrap p-4"
        >
          <div className="relative w-full">
            <input
              type="number"
              className="mb-8 w-full rounded-md border-2 p-2 indent-2 focus:outline-gray-500"
              {...register("price")}
              placeholder="Cena"
            />

            <p className="absolute bottom-0 text-red-600">
              {errors.price && errors.price.message}
            </p>
          </div>

          <div className="relative w-full">
            <input
              className="mb-4 w-full rounded-md border-2 p-2 indent-2 focus:outline-gray-500"
              {...register("weight")}
              placeholder="Masa"
            />
            <p className="absolute bottom-0 text-red-600">
              {errors.weight && errors.weight.message}
            </p>
          </div>
          <div className=" mb-4 ml-1 flex w-full items-center">
            Aktywne:
            <input
              type="checkbox"
              className="ml-2 mt-0.5 scale-125  rounded-md border-2   focus:outline-gray-500"
              {...register("active")}
            />
          </div>

          <button
            className="rounded-lg  border-2 border-green-500 p-2 px-8"
            type="submit"
          >
            <p className="font-bold">Prześlij</p>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Index;
