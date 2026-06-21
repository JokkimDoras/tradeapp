import { useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import AssetSelectionPanel from "./AssetSelectionPanel";
import PricingPanel from "./PricingPanel";
import RiskConfigurationPanel from "./RiskConfigurationPanel";
import useTrade from "../../hooks/useTrade";
import { toast } from "sonner";
import { useUser } from "../../hooks/useUser";
import useScreenshot from "../../hooks/useScreenshot";
import { IoCloseCircle } from "react-icons/io5";


type TradeType = "buy" | "sell";
type TradeStatus = "open" | "closed";

interface AddTradeProps {
  setIsOpen: (isOpen: boolean | any) => void;
  editData?: any;
}

export default function AddTrade({ setIsOpen, editData }: AddTradeProps) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(editData?.currency_pair || "");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [previews, setPreviews] = useState<any[]>([]);
  
  const { toggleSidebar } = useSidebar();
  const { user } = useUser();

  const {
    addTrade,
    updateTrade,
  } = useTrade();

  const { uploadScreenshots } = useScreenshot()



  const [formData, setFormData] = useState({
    currency_pair: editData?.currency_pair || "",
    trade_type:
      (editData?.trade_type?.toLowerCase() as TradeType) ||
      ("buy" as TradeType),
    status:
      (editData?.status?.toLowerCase() as TradeStatus) ||
      ("open" as TradeStatus),
    entry_price: editData?.entry_price ?? "",
    exit_price: editData?.exit_price ?? "",
    stop_loss: editData?.stop_loss ?? "",
    take_profit: editData?.take_profit ?? "",
    lot_size: editData?.lot_size ? editData?.lot_size : user.default_lot_size,
    risk_percentage: editData?.risk_percentage
      ? editData?.risk_percentage
      : user.risk_per_trade,
    notes: editData?.notes || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setType = (type: TradeType) =>
    setFormData((p) => ({ ...p, trade_type: type }));
  const setStatus = (status: TradeStatus) =>
    setFormData((p) => ({ ...p, status }));

  const handleCancel = () => {
    setSearchQuery("");
    setFormData({
      currency_pair: "",
      trade_type: "buy",
      status: "open",
      entry_price: "",
      exit_price: "",
      stop_loss: "",
      take_profit: "",
      lot_size: "",
      risk_percentage: "",
      notes: "",
    });
    setIsOpen(false);
    setPreviews([])
    setImages([])
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 3) {
      toast.error("Max images reached");
      return;
    }

    const file = e.target.files?.[0];
    if (!file || (file.type !== "image/png" && file.type !== "image/jpeg")){
            return toast.error("Invaild file fotmat");
    }
    
    
    const MAX_FILE_SIZE = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

    if(file.size > MAX_FILE_SIZE_BYTES){
      toast.error(`File is Too large ,Max ${MAX_FILE_SIZE}MB`)
      return;
    }
    
    setImages((prev) => [...prev, file]);

    const previewUrl = URL.createObjectURL(file);

    setPreviews((prev) => [...prev, previewUrl]);

    e.target.value = "";
  };

  const handleDeleteLocalImage = (idToDel: number) => {
    const filtered = images.filter((_, i) => {
      return i !== idToDel;
    });
    const deletePreview = previews.filter((_, i) => i !== idToDel);

    setImages(filtered);
    setPreviews(deletePreview);
  };

  const submitImage = async (id: number,imageData:FormData) => {
    try {
      await uploadScreenshots(id,imageData);
    } catch (err: any) {
      console.error(err?.message || err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.currency_pair ||
      !formData.trade_type ||
      !formData.entry_price ||
      !formData.lot_size ||
      !formData.stop_loss ||
      !formData.take_profit ||
      !formData.risk_percentage
    ) {
      toast.error("All Inputs Must be Filled");
      return;
    }

    if (formData.status === "closed" && !formData.exit_price) {
      toast.error("Enter Exit Price.");
      return;
    }

    const safeParseNumeric = (value: any) => {
      if (value === null || value === undefined || String(value).trim() === "")
        return null;
      const num = parseFloat(String(value));
      return isNaN(num) ? null : num;
    };

    const payload = {
      ...formData,
      entry_price: safeParseNumeric(formData.entry_price),
      exit_price:
        formData.status === "closed"
          ? safeParseNumeric(formData.exit_price)
          : null,
      stop_loss: safeParseNumeric(formData.stop_loss),
      take_profit: safeParseNumeric(formData.take_profit),
      lot_size: safeParseNumeric(formData.lot_size),
      risk_percentage: safeParseNumeric(formData.risk_percentage),
      // pips removed from payload — backend calculates and returns it
    };

    try {
      setLoading(true);

      if (editData && editData.id) {
        if (typeof updateTrade === "function") {
          await updateTrade(editData.id, payload);
          toast.success("Updated Succesfully");
        } else {
          console.warn("updateTrade method not found in hook registry.");
        }
        console.log("Terminal Registry Updated Successfully:", payload);
      } else {
        // if the editData or editData.id is not true it will run the addTrade
        const trade: any = await addTrade(payload);
        if(images.length === 0) {
          toast.success("New Trade was Created");
          handleCancel()  
        } 

        const imageData = new FormData();

        images.forEach((image) => {
          imageData.append('screenshots',image)
        })
       await submitImage(trade.id,imageData);
      }

      handleCancel();
    } catch (err) {
      console.error("Database ingestion sequence rejected:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 shrink-0 bg-black">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
              <path
                d="M2 4.5h11M2 7.5h11M2 10.5h11"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="flex items-center gap-2 text-base font-medium tracking-tight text-zinc-400">
            <span>Execution Terminal</span>
          </div>
        </div>
      </header>

      <div className="w-full flex-1 px-8 py-12 flex flex-col items-center gap-10 overflow-y-auto">
        <div className="flex flex-col gap-2 w-full max-w-5xl text-left">
          <h1 className="text-3xl font-bold text-zinc-50 tracking-tight sm:text-4xl">
            {editData ? "Modify Position Node" : "New Position Node"}
          </h1>
          <p className="text-base text-zinc-400 font-normal">
            {editData
              ? "Update parameters for this specific system configuration data stream node."
              : "Commit an active or closed ledger sequence to secure vault database analytics."}
          </p>
          <label className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 active:bg-zinc-900 text-zinc-200 text-sm font-medium rounded-lg border border-zinc-700 cursor-pointer transition-all shrink-0 shadow-sm self-start sm:self-auto">
    {/* SVG Camera/Upload Icon */}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
    </svg>
    
    <span>Add Screenshot</span>
    
    {/* The actual input is hidden, but clicking the label triggers it */}
    <input 
      type="file" 
      className="hidden" 
      onChange={(e) => handleImage(e)} 
    />
  </label>        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl border border-zinc-900 rounded-xl bg-zinc-950/40 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/50"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-r divide-zinc-900">
            <AssetSelectionPanel
              tradeType={formData.trade_type}
              status={formData.status}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              setFormData={setFormData}
              setType={setType}
              setStatus={setStatus}
            />

            <PricingPanel formData={formData} handleChange={handleChange} />

            <RiskConfigurationPanel
              formData={formData}
              handleChange={handleChange}
            />
            {previews?.map((img, index) => (
              <div key={index} className="ml-10">
                <IoCloseCircle
                  className="relative left-44 cursor-pointer top-5 text-red-500  w-4 h-4"
                  onClick={() => handleDeleteLocalImage(index)}
                />

                     <img
                  src={img}
                  alt={`preview-${index} `}
                  className="w-50 "
                />
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-900 p-6 bg-black/40">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-wider font-mono text-zinc-500">
                04 // Post-Execution Commentary
              </label>
              <textarea
                name="notes"
                rows={3}
                placeholder="Log internal psychological drivers, structural constraints..."
                value={formData.notes}
                onChange={handleChange}
                className="w-full bg-zinc-900/20 border border-zinc-900 focus:border-zinc-800 rounded-lg p-3 text-sm text-zinc-300 placeholder-zinc-700 focus:outline-none transition-colors resize-none leading-relaxed"
              />
            </div>
          </div>
          <div className="border-t border-zinc-900 px-6 py-4 bg-zinc-950/80 flex items-center justify-between text-xs font-medium text-zinc-500 font-mono">
            <span>Terminal Registry Stream Node</span>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="hover:text-zinc-300 transition-colors text-red-500 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-zinc-50 text-black hover:bg-zinc-200 disabled:bg-zinc-800 disabled:text-zinc-600 font-sans font-bold text-xs px-4 py-2 rounded-md transition-colors cursor-pointer"
              >
                {loading
                  ? "Vaulting Core..."
                  : editData
                  ? "Save Changes"
                  : "Commit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
