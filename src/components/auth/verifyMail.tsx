"use client"

import { useEffect, useState } from "react"
import userService from "../../services/user"

export default function Verify() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("Verifying your email...")

  useEffect(() => {
    const run = async () => {
      const params = new URLSearchParams(window.location.search)
      const userId = params.get("userId")
      const secret = params.get("secret")

      if (!userId || !secret) {
        setStatus("error")
        setMessage("Invalid verification link (missing userId/secret).")
        return
      }

      const res = await userService.confirmEmailVerification(userId, secret)

      if (res.error) {
        setStatus("error")
        setMessage(res.error)
        return
      }

      setStatus("success")
      setMessage("✅ Email verified successfully! You can go back and login.")
    }

    run()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-8 md:p-10">
          {/* Icon and Status */}
          <div className="flex flex-col items-center mb-6">
            {status === "loading" && (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 animate-pulse">
                <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}

            {status === "success" && (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 animate-bounce">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}

            {status === "error" && (
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}

            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2">Email Verification</h2>
          </div>

          {/* Message */}
          <div
            className={`rounded-xl p-4 mb-6 text-center ${
              status === "loading"
                ? "bg-orange-50 border border-orange-200"
                : status === "success"
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
            }`}
          >
            <p
              className={`text-base md:text-lg ${
                status === "loading" ? "text-orange-800" : status === "success" ? "text-green-800" : "text-red-800"
              }`}
            >
              {message}
            </p>
          </div>

          {/* Success Action */}
          {status === "success" && (
            <a
              href="/login"
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Login
            </a>
          )}

          {/* Error Action */}
          {status === "error" && (
            <a
              href="/"
              className="block w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl text-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Go to Home
            </a>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Need help?{" "}
          <a href="/contact" className="text-orange-500 hover:text-orange-600 font-medium transition-colors">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}
