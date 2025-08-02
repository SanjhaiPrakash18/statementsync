'use client'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-5xl font-bold text-center">
          Transform Bank Statements to <span className="text-blue-600">Excel in Seconds</span>
        </h1>
        <p className="text-xl text-gray-600 text-center mt-6">
          Upload your PDF, JPG, or PNG bank statements and get clean, formatted Excel files instantly.
        </p>
        <div className="text-center mt-8">
          <div className="inline-block p-8 border-2 border-dashed border-gray-300 rounded-lg bg-white">
            <p className="text-gray-500">File upload component will be here</p>
          </div>
        </div>
      </div>
    </div>
  )
}
