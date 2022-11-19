import { useForm, UseFormProps } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const validationSchema = z.object({
    name: z.string().min(1, { message: "Pole nie może być puste."}).max(30, { message: "Pole może mieć maksymalnie 30 znaków"}),
    lastName: z.string().min(1, { message: "Pole nie może być puste."}).max(30, { message: "Pole może mieć maksymalnie 30 znaków"}),
    phoneNumber: z.string().min(9, { message: "Nieodpowiedni format numeru telefonu "}).max(15, { message: "Nieodpowiedni format numeru telefonu"}).trim(),
    city: z.string().min(1, { message: "Pole nie może być puste."}).max(30, { message: "Pole może mieć maksymalnie 30 znaków"}),
});

function useZodForm<TSchema extends z.ZodType>(
    props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
      schema: TSchema;
    },
  ) {
    const form = useForm<TSchema['_input']>({
      ...props, 
      resolver: zodResolver(props.schema, undefined),
    });
  
    return form;
  }
  

const Index: React.FC = () => {    
    const { data: sessionData } = useSession();
    const router = useRouter();
    useEffect(()=> {
        if (sessionData?.user?.name !== null) {
          //  router.push('/home')
        }
    },[])


      const mutation = trpc.register.fillMissingData.useMutation()

    const { register, handleSubmit, reset, formState: {errors} } = useZodForm({
        schema: validationSchema,
        defaultValues: {
          name: '',
          lastName: '',
          phoneNumber: '',
          city: '',
        },
      });

  return (
    <>
      <h1>Uzupełnij kilka danych bam</h1>
      <form
        onSubmit={handleSubmit(async (values) => {
            await mutation.mutate(values)
          reset();
          //router.push('/home')
        })}
        className="space-y-2"
      >
        <input {...register("name")} placeholder="imię"/>
        {errors.name && errors.name.message}
        <input {...register("lastName")} placeholder="Nazwisko"/>
        {errors.lastName && errors.lastName.message}
        <input {...register("phoneNumber")} placeholder="Numer Telefonu"/>
        {errors.phoneNumber && errors.phoneNumber.message}
        <input {...register("city")} placeholder="Miejscowość"/>
        {errors.city && errors.city.message}
        <input type="submit" />

      </form>
    </>
  );
}

export default Index;