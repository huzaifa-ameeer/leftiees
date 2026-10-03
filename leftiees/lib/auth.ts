import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { nextCookies } from "better-auth/next-js";
import { emailOTP } from "better-auth/plugins";
import { MongoClient } from "mongodb";

import { sendOtpEmail } from "@/lib/email";

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not set. Add it to your .env file.");
}

const globalForMongo = globalThis as unknown as {
  mongoClient?: MongoClient;
};

const client = globalForMongo.mongoClient ?? new MongoClient(MONGO_URI);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const db = client.db("leftiees");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    emailOTP({
      otpLength: 6,
      expiresIn: 600,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "email-verification") {
          await sendOtpEmail({ email, otp });
        }
      },
    }),
    nextCookies(),
  ],
});
