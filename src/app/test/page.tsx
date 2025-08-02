export default function TestPage() {
  return (
    <div style={{ backgroundColor: 'red', padding: '20px' }}>
      <h1 style={{ color: 'white' }}>Inline CSS Test</h1>
      <div className="bg-blue-500 text-white p-4 mb-4">
        <p>This should have blue background (Tailwind test)</p>
      </div>
      <div className="bg-background text-foreground p-4 mb-4 border">
        <p>This should have background using CSS variables</p>
      </div>
      <div style={{ 
        backgroundColor: 'hsl(221.2 83.2% 53.3%)', 
        color: 'white', 
        padding: '10px' 
      }}>
        <p>This should have primary color background (inline HSL)</p>
      </div>
      <div className="gradient-text text-2xl font-bold">
        <p>This should have gradient text</p>
      </div>
    </div>
  )
}