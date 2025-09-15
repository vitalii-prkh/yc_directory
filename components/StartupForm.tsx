"use client";

import React from "react";
import {useRouter} from "next/navigation";
import {Send} from "lucide-react";
import {z} from "zod";
import {schema} from "@/lib/validation";
import {useToast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import InputText from "@/components/InputText";
import Textarea from "@/components/Textarea";
import InputMarkdown from "@/components/InputMarkdown";
import {getInitialState, getInitialErrors} from "@/components/map-values";

function StartupForm() {
  const [pitch, setPitch] = React.useState("");
  const {toast} = useToast();
  const router = useRouter();
  const [state, formAction, isPending] = React.useActionState<
    ReturnType<typeof getInitialState>,
    FormData
  >(async (_, formData) => {
    const values = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: formData.get("link") as string,
      pitch,
    };

    try {
      await schema.parseAsync(values);
      // const result = await createIdea(values);
      // console.log(result)

      // if (result.status === "SUCCESS") {
      //   toast({
      //     title: "Success",
      //     description: "Your startup pitch has been created successfully",
      //   });
      //
      //   router.push(`/startup/${result.id}`);
      // }

      return {
        status: "success",
        values,
        errors: getInitialErrors(),
      };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors = error.flatten().fieldErrors;

        toast({
          title: "Error",
          description: "Please, check your inputs and try again",
          variant: "destructive",
        });

        return {
          values,
          errors,
          status: "failure",
        };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occurred",
      });

      return {
        values,
        errors: getInitialErrors(),
        status: "failure",
      };
    }
  }, getInitialState());

  return (
    <form
      action={formAction}
      className="startup-form"
    >
      <InputText
        id="title"
        name="title"
        label="Title"
        required
        placeholder="Starup Title"
        defaultValue={state.values.title}
        errors={state.errors.title}
      />
      <Textarea
        id="description"
        name="description"
        label="Description"
        required
        placeholder="Starup Description"
        defaultValue={state.values.description}
        errors={state.errors.description}
      />
      <InputText
        id="category"
        name="category"
        label="Category"
        required
        placeholder="Starup Category (Tech, Health, Finance, etc.)"
        defaultValue={state.values.category}
        errors={state.errors.category}
      />
      <InputText
        id="link"
        name="link"
        label="Image URL"
        required
        placeholder="Starup Image URL"
        defaultValue={state.values.link}
        errors={state.errors.link}
      />
      <InputMarkdown
        id="pitch"
        name="pitch"
        label="Pitch"
        value={pitch}
        onChange={(value) => setPitch(value || "")}
        required
        placeholder="Briefly describe your idea and what problem it solves."
        defaultValue={state.values.pitch}
        errors={state.errors.pitch}
      />
      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit"}
        <Send className="ml-2 !size-6" />
      </Button>
    </form>
  );
}

export default StartupForm;
