import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home    from './pages/Home'
import Docs    from './pages/Docs'
import Proxy   from './pages/Proxy'
import Queries from './pages/Queries'
import Schema  from './pages/Schema'
import Cli     from './pages/Cli'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/"        element={<Home />} />
            <Route path="/docs"    element={<Docs />} />
            <Route path="/proxy"   element={<Proxy />} />
            <Route path="/queries" element={<Queries />} />
            <Route path="/schema"  element={<Schema />} />
            <Route path="/cli"     element={<Cli />} />
            <Route path="*"        element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
