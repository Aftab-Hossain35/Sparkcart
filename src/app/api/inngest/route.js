import { serve } from "inngest/next";
import { inngest, UserCreation, UserDeletion, UserUpdation,UserOrder } from "@/config/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    UserCreation,
    UserUpdation,
    UserDeletion,
    UserOrder 
  ],
});