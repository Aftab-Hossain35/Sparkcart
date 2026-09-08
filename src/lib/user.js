// import { currentUser } from "@clerk/nextjs/server";
// import connectDB from "@/config/db";
// import User from "@/models/User";

// export async function getOrCreateUser() {
//   const clerkUser = await currentUser();

//   if (!clerkUser) {
//     return null;
//   }

//   await connectDB();

//   let user = await User.findOne({
//     clerkId: clerkUser.id,
//   });

//   if (!user) {
//     const email =
//       clerkUser.emailAddresses?.[0]?.emailAddress || "";

//     const name =
//       `${clerkUser.firstName || ""} ${
//         clerkUser.lastName || ""
//       }`.trim() || "User";

//     user = await User.create({
//       clerkId: clerkUser.id,
//       name,
//       email,
//       imageUrl: clerkUser.imageUrl || "",
//       cartItems: {},
//     });
//   }

//   return user;
// }