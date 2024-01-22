"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  age: z.string().refine(
    (data) => {
      const parsedNumber = parseInt(data, 10);
      return !isNaN(parsedNumber) && parsedNumber >= 30 && parsedNumber <= 100;
    },
    {
      message: "Age must be between 30 and 100 (inclusive)",
    },
  ),
  weight: z.string().refine(
    (data) => {
      const parsedNumber = parseInt(data, 10);
      return !isNaN(parsedNumber) && parsedNumber >= 60 && parsedNumber <= 500;
    },
    {
      message: "Weight must be between 60 and 500 (lbs) (inclusive)",
    },
  ),
  height: z.string().refine(
    (data) => {
      const parsedNumber = parseInt(data, 10);
      return !isNaN(parsedNumber) && parsedNumber >= 36 && parsedNumber <= 96;
    },
    {
      message: "Final year must be between 36 and 96 (in) (inclusive)",
    },
  ),
});

const ProfileForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      age: "42",
      weight: "120",
      height: "64",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input placeholder="42" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight (lbs)</FormLabel>
                <FormControl>
                  <Input placeholder="110" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="height"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Height (in)</FormLabel>
                <FormControl>
                  <Input placeholder="62" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="mx-auto flex">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
