import { useBreadCrumbs } from "@hooks/useBreadCrumbs"

export function PageHeader () {
    const paths = useBreadCrumbs();

    return <div className="flex gap-4">
    {paths.map((path) => (
        <span>{path}</span>
    ))}
    </div>
}