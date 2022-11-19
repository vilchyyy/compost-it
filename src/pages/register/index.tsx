import { useForm, UseFormProps } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Input from "../../components/Input"

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
    <div className="bg-gray-500 w-full h-screen flex justify-center items-center">
      <div className="bg-white mx-64 w-3/12 rounded-lg shadow-lg border border-gray-800">
          <h1 className="text-xl text-center my-4">Uzupełnij kilka danych</h1>
          <form
            onSubmit={handleSubmit(async (values) => {
                await mutation.mutate(values)
              reset();
              //router.push('/home')
            })}
            className="flex flex-col m-4 flex-wrap"
          >
            <a className="text-red-600">{errors.name && errors.name.message}</a>
            <input className="mb-8 h-10 border-2 rounded-md" {...register("name")} placeholder="Imię"/>
            <a className="text-red-600">{errors.lastName && errors.lastName.message}</a>
            <input className="mb-8 h-10 border-2 rounded-md" {...register("lastName")} placeholder="Nazwisko"/>
            <a className="text-red-600">{errors.phoneNumber && errors.phoneNumber.message}</a>
            <input className="mb-8 h-10 border-2 rounded-md" {...register("phoneNumber")} placeholder="Numer Telefonu"/>
            <a className="text-red-600">{errors.city && errors.city.message}</a>
            <input className="mb-8 h-10 border-2 rounded-md" {...register("city")} placeholder="Miejscowość"/>
            
            <button className="px-8  border-2 rounded-lg border-green-700" type="submit" >Prześlij</button>
          </form>
      </div>
      
    </div>
  );
}

export default Index;