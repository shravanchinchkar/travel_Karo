import client from "@/db/index";
import bcrypt from "bcrypt";
import { getExpiryDate } from "@/lib/generate-expiry-date";
import { generateVerifyCode } from "@/lib/generate-verify-code";
import { sendVerificationEmail } from "@/resend/sendVerificationEmail";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Placeholder",
        },
      },
      async authorize(credentials: any) {
        try {
          //extract the email and password send by the user
          const { email, password } = credentials;

          //check if the user with the entered email already exists in db
          const userExists = await client.travelAgent.findFirst({
            where: {
              email: email,
            },
          });

          if (!userExists) {
            console.error("User doesn't exists");
            throw new Error(
              JSON.stringify({
                success: false,
                message: "User doesn't exist",
                status: "404",
              })
            );
          } else if (!userExists.isVerified) {
            // User has signedup but not verified then the below block
            const passwordValidation = await bcrypt.compare(
              password,
              userExists.password
            );
            if (passwordValidation) {
              const verifyCode = generateVerifyCode(); //Generate the verify Code for email Authentication
              const expiryDate = getExpiryDate();

              const updateExistingUser = await client.travelAgent.update({
                where: { email: userExists.email },
                data: {
                  verifyCode: verifyCode,
                  verifyCodeExpiry: expiryDate,
                },
              });

              if (updateExistingUser) {
                // Send verification email for the unverified user
                const emailResponse = await sendVerificationEmail(
                  userExists.businessName,
                  userExists.email,
                  verifyCode
                );

                // If error while sending email
                if (!emailResponse.success) {
                  throw new Error(
                    JSON.stringify({
                      success: false,
                      message: emailResponse.message,
                      status: "500",
                    })
                  );
                }

                // If success in sending email
                return {
                  id: userExists.id.toString(),
                  businessName: userExists.businessName,
                  email: userExists.email,
                  isVerified: userExists.isVerified,
                  customResponse: {
                    success: true,
                    message:
                      "Verification email sent. Please verify your account.",
                    status: "200",
                  },
                };
              } else {
                return null;
              }
            } else {
              throw new Error(
                JSON.stringify({
                  success: false,
                  message: "Invalid password",
                  status: "401",
                })
              );
            }
          }
          // Initially user has signedin using NextAuth but now the user is signing using credentials then the following code block
          else if (
            userExists.isOAuth &&
            userExists.password === "oauth-no-password"
          ) {
            console.error(
              "OAuth user has not set a password for credential login."
            );
            throw new Error(
              JSON.stringify({
                success: false,
                message: "OAuth user cannot use credentials login",
                status: "403",
              })
            );
          }
          //Normal case
          else {
            const passwordValidation = await bcrypt.compare(
              password,
              userExists.password
            );
            if (passwordValidation) {
              return {
                id: userExists.id.toString(),
                businessName: userExists.businessName,
                email: userExists.email,
                isVerified: userExists.isVerified,
                customResponse: {
                  success: true,
                  message: "Sign-in successful",
                  status: "200",
                },
              };
            } else {
              console.error("Invalid Password!");
              throw new Error(
                JSON.stringify({
                  success: false,
                  message: "Invalid password",
                  status: "401",
                })
              );
            }
          }
        } catch (error) {
          console.error("Error while Signing In", error);
          throw new Error(
            JSON.stringify({
              success: false,
              message: "Error while signing in",
              status: "500",
            })
          );
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async ({ user, account }: any) => {
      if (account.provider === "google") {
        console.log("Signin withe google!");
        console.log("user is google signin:",user)
        const upsertedUser = await client.travelAgent.upsert({
          where: { email: user.email },
          update: {
            businessName: user.name,
            email: user.email,
            password: "oauth-no-password",
            isOAuth: true,
            isVerified: true,
          },
          create: {
            businessName: user.name,
            email: user.email,
            password: "oauth-no-password",
            location:"",
            phoneNumber:"",
            isOAuth: true,
            isVerified: true,
          },
        });
        console.log("user signin", upsertedUser);
        user.id = upsertedUser.id;
        return true;
      }
      return true;
    },

    async jwt({ token, user }: any) {
      // When the user signs in, `user` contains the object returned by `authorize`
      if (user) {
        token.id = user.id;
        token.isVerified = user.isVerified; // Pass isVerified to the token
      }
      return token;
    },
    // The session callback helps in displaying the  userId in client component
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.isVerified = token.isVerified as boolean; // Pass isVerified to the session
      }
      console.log("user session", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
