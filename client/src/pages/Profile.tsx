import { useSidebar } from "../hooks/useSidebar"
export default function Profile () {
    const { openSidebar} = useSidebar()

    const handleClick = () => {
  openSidebar()
    }
    return <div className="flex flex-col">
        <button onClick={handleClick}>open</button>
        Profile
        sdflsdfhjsdfhksjd
    </div>
}