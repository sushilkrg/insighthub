"use client";

import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  // FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createInsightSchema } from "@/schemas/createInsightSchema";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

function Create() {
 
  // const [tag, setTag] = useState("");
  // const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof createInsightSchema>>({
    resolver: zodResolver(createInsightSchema),
    defaultValues: {
      tag: "",
      question: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof createInsightSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>(
        "/api/create-insight",
        data
      );

      toast({
        title: "Success",
        description: response?.data?.message,
      });

      router.replace("/dashboard");
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error in creating insight:", error);
      const axiosError:any = error as AxiosError;
      console.log("axosErrrrror-", axiosError);
      
      const errorMessage = axiosError?.message;
      console.log("errrrrrorMessage-", errorMessage);

      toast({
        title: "Failed to create new Insight",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="tag"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-start font-semibold">
                      Tag
                    </FormLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // setTag(e.target.value);
                      }}
                    />
                  </FormItem>
                )}
              />
              <FormField
                name="question"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-start font-semibold">
                      Question
                    </FormLabel>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        // setQuestion(e.target.value);
                      }}
                    />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-1/3" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-8 animate-spin" />
                    Please wait
                  </>
                ) : (
                  "Create Insight"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Create;
