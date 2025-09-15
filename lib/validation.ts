import {z} from "zod";
import {validateImageByPOST} from "./validateImageByPOST";

export const schema = z.object({
  title: z.string().min(3).max(50),
  description: z.string().min(20).max(100),
  category: z.string().min(3).max(20),
  link: z.string().min(1).url().refine(validateImageByPOST),
  pitch: z.string().min(10).max(1000),
});
