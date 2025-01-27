import Header from './components/header/Header'
import { Outlet } from 'react-router-dom'


function RootLayout() {
  return (
    <div>
        <Header />
        {/* Body -> outlet */}
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default RootLayout

