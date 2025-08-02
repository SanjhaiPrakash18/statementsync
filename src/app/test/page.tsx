export default function TestPage() {
  return (
    <div className="bg-muted p-5">
      <h1 className="text-foreground">Monochrome Theme Test</h1>
      <div className="bg-foreground text-background p-4 mb-4">
        <p>This should have dark background (Tailwind test)</p>
      </div>
      <div className="bg-background text-foreground p-4 mb-4 border">
        <p>This should have background using CSS variables</p>
      </div>
      <div className="bg-primary text-primary-foreground p-3">
        <p>This should have primary color background (monochrome)</p>
      </div>
      <div className="gradient-text text-2xl font-bold">
        <p>This should have gradient text (now grayscale)</p>
      </div>
    </div>
  )
}