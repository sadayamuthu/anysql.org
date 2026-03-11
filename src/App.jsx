import { HashRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home    from './pages/Home'
import Sdk     from './pages/Sdk'
import Server  from './pages/Server'
import Ui      from './pages/Ui'
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
            <Route path="/sdk"     element={<Sdk />} />
            <Route path="/server"  element={<Server />} />
            <Route path="/ui"      element={<Ui />} />
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
