import { useForm, UseFormProps } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { trpc } from "../../utils/trpc";

export const validationSchema = z.object({
    name: z.string(),
    lastName: z.string(),
    phoneNumber: z.string(),
    city: z.string(),
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
  

export default function Index() {

    const mutation = trpc.register.fillMissingData.useMutation()

    const methods = useZodForm({
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
        onSubmit={methods.handleSubmit(async (values) => {
            await mutation.mutate(values)
          methods.reset();
        })}
        className="space-y-2"
      >
        <input {...methods.register("name")} placeholder="imię"/>
        <input {...methods.register("lastName")} placeholder="Nazwisko"/>
        <input {...methods.register("phoneNumber")} placeholder="Numer Telefonu"/>
        <input {...methods.register("city")} placeholder="Miejscowość"/>
        <input type="submit" />

      </form>
    </>
  );
}
