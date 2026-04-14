import { type NextRequest, NextResponse } from "next/server"
import { writeFile, readFile, mkdir } from "fs/promises"
import { existsSync } from "fs"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    // Create emails directory if it doesn't exist
    const emailsDir = path.join(process.cwd(), "emails")
    if (!existsSync(emailsDir)) {
      await mkdir(emailsDir, { recursive: true })
    }

    // Path to the emails file
    const emailsFile = path.join(emailsDir, "newsletter-emails.txt")

    // Read existing emails or create empty string
    let existingEmails = ""
    try {
      existingEmails = await readFile(emailsFile, "utf-8")
    } catch (error) {
      // File doesn't exist yet, that's okay
    }

    // Check if email already exists
    if (existingEmails.includes(email)) {
      return NextResponse.json({ error: "Email already subscribed" }, { status: 400 })
    }

    // Add new email with timestamp
    const timestamp = new Date().toISOString()
    const newEntry = `${email} - ${timestamp}\n`
    const updatedEmails = existingEmails + newEntry

    // Write back to file
    await writeFile(emailsFile, updatedEmails, "utf-8")

    return NextResponse.json({ success: true, message: "Email saved successfully" })
  } catch (error) {
    console.error("Error saving email:", error)
    return NextResponse.json({ error: "Failed to save email" }, { status: 500 })
  }
}
