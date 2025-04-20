"use client";

import axios from "axios";
import { Loader2, MailCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
  const router = useSearchParams();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(false)
    const urlToken: any = router.get("token") 
    setToken(urlToken);
  }, [router]);

  useEffect(() => {
    setError(false)
    if (token && token.length > 0) {
        console.log("Token: ", token);
        
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true)
      setError(false)
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md w-full space-y-6">
        <div className="flex flex-col items-center">
          <MailCheck className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Click the button below to verify your email.
          </p>
        </div>
        <button
          onClick={verifyUserEmail}
          disabled={loading || !token}
          className={`flex justify-center w-full py-2.5 text-white rounded-lg text-sm font-semibold transition ${
            loading || !token
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? <Loader2 ref={"Verifying"} /> : "Verify Email"}
        </button>
        <div>
            <div>
                {
                    verified && (
                        <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
                            <MailCheck className="w-5 h-5 mr-2" />
                            <span>Email verified successfully!</span>
                            <Link href={'/login'} className="ml-2 text-blue-600 dark:text-blue-400 hover:underline">
                                Go to Login
                            </Link>
                        </div>
                    )
                }
            </div>
            <div>
                {
                    error && (
                        <div className="flex items-center text-red-600 dark:text-red-400 mb-2">
                            <MailCheck className="w-5 h-5 mr-2" />
                            <span>Invalid or expired token. Please try again.</span>
                        </div>
                    )
                }
            </div>
        </div>
      </div>
        <div className="flex flex-col justify-center items-center mt-8">
        <span className="text-white text-sm">
          © 2025 Auth App. All rights reserved.
        </span>
        <p className="text-white text-sm ml-2">Designed By Muhammad Abdullah Tanveer</p>
      </div>
    </section>
  );
}
