"use client";
import { Input } from "@/_components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";

const SearchInput = () => {
  const router = useRouter();
  const formSchema = z.object({
    search: z
      .string()
      .min(1, { message: "Pesquise por um nome ou serviço" })
      .trim(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  });
  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/barber-shop?name=${data.search}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex w-full items-center gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input placeholder="Faça sua busca" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="h-9 w-10">
          <SearchIcon size={16} />
        </Button>
      </form>
    </Form>
  );
};

export default SearchInput;
