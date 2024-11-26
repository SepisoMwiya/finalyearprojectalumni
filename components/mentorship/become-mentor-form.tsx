"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  expertise: z
    .array(z.string())
    .min(1, "At least one area of expertise is required"),
  bio: z.string().min(50, "Bio must be at least 50 characters"),
  availability: z.string(),
});

export default function BecomeMentorForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      expertise: [],
      bio: "",
      availability: "Available",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch("/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Failed to register as mentor");
      }

      toast({
        title: "Success",
        description: "You are now registered as a mentor!",
      });

      router.push("/mentorship");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register as mentor. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="expertise"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Areas of Expertise</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter expertise (comma-separated)"
                  onChange={(e) => {
                    field.onChange(
                      e.target.value.split(",").map((item) => item.trim())
                    );
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mentor Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your experience and what you can offer as a mentor..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register as Mentor"}
        </Button>
      </form>
    </Form>
  );
}
