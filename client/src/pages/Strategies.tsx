import { useSidebar } from "../hooks/useSidebar"
export default function Strategies () {
    const { openSidebar} = useSidebar()

    const handleClick = () => {
  openSidebar()
    }
    return <div className="flex flex-col">
        <button onClick={handleClick}>open</button>
        Strategies
        sdflsdfhjsdfhksjd
    </div>
}