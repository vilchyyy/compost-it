import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Input from "../../components/Input";

export const validationSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Pole nie może być puste." })
    .max(30, { message: "Pole może mieć maksymalnie 30 znaków" }),
  lastName: z
    .string()
    .min(1, { message: "Pole nie może być puste." })
    .max(30, { message: "Pole może mieć maksymalnie 30 znaków" }),
  phoneNumber: z
    .string()
    .min(9, { message: "Nieodpowiedni numeru telefonu " })
    .max(15, { message: "Nieodpowiedni numeru telefonu" })
    .trim(),
  city: z
    .string()
    .min(1, { message: "Pole nie może być puste." })
    .max(30, { message: "Pole może mieć maksymalnie 30 znaków" }),
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
      //router.push('/home')
    }
  }, []);


  const mutation = trpc.register.fillMissingData.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useZodForm({
    schema: validationSchema,
    defaultValues: {
      name: "",
      lastName: "",
      phoneNumber: "",
      city: "",
    },
  });
  const fields = ["name", "lastName", "phoneNumber", "city"];
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg border border-gray-300 bg-white shadow-xl">
        <h1 className="my-4 text-center text-xl">Uzupełnij kilka danych</h1>
        <form
          onSubmit={handleSubmit(async (values) => {
            mutation.mutate(values);
            reset();
            router.push('/market')
          })}
          className="flex flex-col flex-wrap p-4"
        >
          <div className="relative w-full">
            <input
              className="mb-8 w-full rounded-md border-2 p-2 indent-2 focus:outline-gray-500"
              {...register("name")}
              placeholder="Imię"
            />

            <p className="absolute bottom-0 text-red-600">
              {errors.name && errors.name.message}
            </p>
          </div>

          <div className="relative w-full">
            <input
              className="mb-8 w-full rounded-md border-2 p-2 indent-2 focus:outline-gray-500"
              {...register("lastName")}
              placeholder="Nazwisko"
            />
            <p className="absolute bottom-0 text-red-600">
              {errors.lastName && errors.lastName.message}
            </p>
          </div>
          <div className="relative w-full">
            <input
              className="mb-8 w-full rounded-md border-2 p-2 indent-2 focus:outline-gray-500"
              {...register("phoneNumber")}
              placeholder="Numer telefonu"
            />
            <p className="absolute bottom-0 text-red-600">
              {errors.phoneNumber && errors.phoneNumber.message}
            </p>
          </div>

          <div className="relative w-full">
            <input
              className="mb-8 w-full rounded-md border-2 p-2 indent-2 focus:outline-gray-500"
              {...register("city")}
              placeholder="Miejscowość"
            />
            <p className="absolute bottom-0 text-red-600">
              {errors.city && errors.city.message}
            </p>
          </div>

          <input
            className="rounded-lg  border-2 border-green-500 p-2 px-8 font-bold"
            type="submit"
            value="Prześlij"
          />
        </form>
      </div>
    </div>
  );
};

export default Index;
