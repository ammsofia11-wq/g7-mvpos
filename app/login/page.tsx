"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<"login" | "signup">("login")
  const [message, setMessage] = useState("")

  const handleAuth = async () => {
    setMessage("")

    if (!email.trim() || !password.trim()) {
      setMessage("Email and password are required")
      return
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters")
      return
    }

    setLoading(true)

    try {
      const result =
        mode === "signup"
          ? await supabase.auth.signUp({
              email: email.trim(),
              password,
            })
          : await supabase.auth.signInWithPassword({
              email: email.trim(),
              password,
            })

      if (result.error) {
        setMessage(result.error.message)
        return
      }

      if (mode === "login") {
        router.push("/dashboard")
      } else {
        setMode("login")
        setMessage("Account created. Check your email if confirmation is required.")
      }
    } catch {
      setMessage("Unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #12213a 0%, #050814 45%, #02040a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        color: "#ffffff",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#0b1020",
          border: "1px solid rgba(34, 211, 238, 0.45)",
          borderRadius: "28px",
          padding: "34px",
          boxShadow: "0 30px 90px rgba(0,0,0,0.55)",
        }}
      >
        <p
          style={{
            color: "#22d3ee",
            fontSize: "12px",
            letterSpacing: "4px",
            fontWeight: 900,
            marginBottom: "12px",
          }}
        >
          G7 CULINARY INTELLIGENCE
        </p>

        <h1
          style={{
            color: "#ffffff",
            fontSize: "42px",
            lineHeight: "1",
            fontWeight: 900,
            marginBottom: "10px",
          }}
        >
          {mode === "login" ? "Login" : "Create Account"}
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize: "15px",
            marginBottom: "26px",
          }}
        >
          Access your G7 nutrition operating system.
        </p>

        {message && (
          <div
            style={{
              background: "rgba(34, 211, 238, 0.12)",
              border: "1px solid rgba(34, 211, 238, 0.35)",
              color: "#cffafe",
              padding: "12px",
              borderRadius: "14px",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            {message}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "15px 16px",
            marginBottom: "14px",
            background: "#111827",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "14px",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "15px 16px",
            marginBottom: "18px",
            background: "#111827",
            color: "#ffffff",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: "14px",
            outline: "none",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleAuth}
          disabled={loading}
          style={{
            width: "100%",
            padding: "16px 20px",
            background: loading ? "#64748b" : "#22d3ee",
            color: "#001018",
            border: "2px solid #67e8f9",
            borderRadius: "16px",
            fontSize: "19px",
            fontWeight: 900,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 12px 35px rgba(34, 211, 238, 0.35)",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading
            ? "Processing..."
            : mode === "login"
            ? "LOGIN"
            : "CREATE ACCOUNT"}
        </button>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login")
            setMessage("")
          }}
          style={{
            width: "100%",
            marginTop: "22px",
            background: "transparent",
            color: "#67e8f9",
            border: "none",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {mode === "login"
            ? "Don't have an account? Sign up"
            : "Already have an account? Login"}
        </button>
      </section>
    </main>
  )
}