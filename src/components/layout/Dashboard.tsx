import Sidebar from "./Sidebar";


export default function Dashboard({ children }: { children: React.ReactNode }) {
  return (
    <>
        <Sidebar />
        {children}
    </>
       
    
  )
}
