interface DataRowProps {
    label: string;
    value: any;
    valueClass?: string;
  }
  
  export default function DataRow({ label, value, valueClass = "text-zinc-200 font-medium" }: DataRowProps) {
    return (
      <div className="grid grid-cols-2 p-4">
        <span className="text-zinc-500">{label}</span>
        <span className={`text-right sm:text-left ${valueClass}`}>{value ?? "—"}</span>
      </div>
    );
  }