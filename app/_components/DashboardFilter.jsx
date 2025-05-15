import { FaFilter } from "react-icons/fa"
import Button from "../_ui/Button"

function DashboardFilter() {
    return (
        <div className="space-x-3">
            <select name="" id="" className="py-2 px-3 border-1 border-[var(--border)]">
                <option value="">month</option>
                <option value="">january</option>
            </select>
            <select name="" id="" className="py-2 px-3 border-1 border-[var(--border)]">
                <option value="">year</option>
                <option value="">2025</option>
            </select>
            <Button>
                <span className="flex items-center tracking-wider gap-1"><FaFilter /> filter</span>
            </Button>
        </div>
    )
}

export default DashboardFilter
