"use client";

import { SessionProvider, useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function LoginContent() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to root if user is already signed in
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignIn = async () => {
    if (session) {
      // Redirect if already signed in
      router.push("/");
    } else {
      // Trigger the sign-in flow
      await signIn("google");
    }
  };

  if (status === "loading") {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Welcome Back!</h1>
        <p className="text-gray-600 text-center mt-2">Sign in to access your account</p>
        <button
          onClick={handleSignIn}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <SessionProvider>
      <LoginContent />
    </SessionProvider>
  );
}