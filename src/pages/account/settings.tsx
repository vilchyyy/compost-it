import { useForm, UseFormProps } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
    .min(9, { message: "Nieodpowiedni format numeru telefonu " })
    .max(15, { message: "Nieodpowiedni format numeru telefonu" })
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

const Settings: React.FC = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  const { data: userData } = trpc.auth.getCurrUser.useQuery(undefined, {
    enabled: sessionData?.user !== undefined,
  });
  const [changedData, setChangedData] = useState(false);

  const mutation = trpc.register.fillMissingData.useMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useZodForm({
    schema: validationSchema,
    defaultValues: {
      name: userData?.name !== null ? userData?.name : "",
      lastName: userData?.lastName ? userData?.lastName : "",
      phoneNumber: userData?.phoneNumber ? userData?.phoneNumber : "",
      city: userData?.city ? userData?.city : "",
    },
  });

  useEffect(() => {
    reset({
      name: userData?.name !== null ? userData?.name : "",
      lastName: userData?.lastName ? userData?.lastName : "",
      phoneNumber: userData?.phoneNumber ? userData?.phoneNumber : "",
      city: userData?.city ? userData?.city : "",
    });
    console.log("benc");
  }, [userData]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg border border-gray-300 bg-white shadow-xl">
        <h1 className="my-4 text-center text-xl">Zmodyfikuj swoje dane</h1>
        <form
          onSubmit={handleSubmit(async (values) => {
            await mutation.mutate(values);
            reset();
          })}
          className="m-4 flex flex-col flex-wrap"
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
              placeholder="Numer Telefonu"
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

export default Settings;
