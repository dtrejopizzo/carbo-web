"use client"

import type React from "react"
import { useState } from "react"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsSuccess(true)
        setEmail("")

        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSuccess(false)
        }, 3000)
      } else {
        setError(data.error || "Failed to subscribe")
      }
    } catch (error) {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-md">
      <p className="text-white mb-4">
        Sign up for our monthly Insights on the energy transition, and get our press releases at the top of your inbox.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full px-4 py-2 border border-quaise-teal-dark bg-white text-quaise-teal-darkest"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-transparent border border-white text-white hover:bg-white hover:text-quaise-teal-darkest transition-colors disabled:opacity-50"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        {isSuccess && <div className="mt-2 text-white">Thank you for subscribing!</div>}
        {error && <div className="mt-2 text-red-300">{error}</div>}
      </form>
    </div>
  )
}
