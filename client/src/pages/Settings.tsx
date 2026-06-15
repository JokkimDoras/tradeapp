import { useSidebar } from "../hooks/useSidebar"

export default function Setting () {
    const { toggleSidebar } = useSidebar()
    const handleClick = () => {
    toggleSidebar()
    }
    return <div>
        <div onClick={handleClick} className="text-white">Open</div>
        Setting
    </div>
}