import { readFile } from "fs/promises"
import path from "path"
import { existsSync } from "fs"

export default async function EmailsPage() {
  let emails = "No emails found yet."

  try {
    const emailsFile = path.join(process.cwd(), "emails", "newsletter-emails.txt")

    if (existsSync(emailsFile)) {
      const emailsContent = await readFile(emailsFile, "utf-8")
      emails = emailsContent || "No emails found yet."
    }
  } catch (error) {
    emails = "Error reading emails file."
  }

  // Split emails into array and reverse to show newest first
  const emailList = emails.trim() ? emails.trim().split("\n").reverse() : []

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Newsletter Subscribers</h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <span className="text-sm text-gray-600">Total subscribers: {emailList.length}</span>
          </div>

          {emailList.length > 0 ? (
            <div className="space-y-2">
              {emailList.map((emailEntry, index) => {
                const [email, timestamp] = emailEntry.split(" - ")
                return (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{email}</span>
                    <span className="text-sm text-gray-500">
                      {timestamp ? new Date(timestamp).toLocaleDateString() : ""}
                    </span>
                  </div>
                )
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">No subscribers yet.</p>
          )}
        </div>

        <div className="mt-8">
          <a href="/" className="text-quaise-teal hover:text-quaise-teal-dark underline">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
