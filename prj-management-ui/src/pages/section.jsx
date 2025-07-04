import { useQuery } from "@tanstack/react-query"
import { getSectionAPI } from "../api/api"

export default function SectionPage() {
    const {data: section} = useQuery({
        queryFn: getSectionAPI
    })
    return(
        <main className="w-full h-screen">
        <table className="min-w-full table-auto border-collapse">
    <thead className="bg-gray-100 text-gray-700">
        <tr>
            <th className="px-4 py-2 border-b">Name</th>
            <th className="px-4 py-2 border-b">Year</th>
        </tr>
    </thead>
    <tbody className="text-gray-800">
        {section && section.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 ">
                <td className="px-4 py-2 border-b">{item.name}</td>
                <td className="px-4 py-2 border-b">{item.school_year}</td>
            </tr>
        ))}
    </tbody>
</table>

        </main>
    )
}