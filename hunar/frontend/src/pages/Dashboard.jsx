import { useState } from "react"

import Graph from "./Home"
import Sidebar from "./SideBar"
import './Dashboard.css'

const Dashboard = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div className='grid-container'>
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <Graph />
    </div>
  )
}
export default Dashboard