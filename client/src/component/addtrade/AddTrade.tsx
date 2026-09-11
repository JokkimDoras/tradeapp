import { useEffect, useState } from "react";
import { useSidebar } from "../../hooks/useSidebar";
import AssetSelectionPanel from "./AssetSelectionPanel";
import PricingPanel from "./PricingPanel";
import RiskConfigurationPanel from "./RiskConfigurationPanel";
import useTrade from "../../hooks/useTrade";
import { toast } from "sonner";
import { useUser } from "../../hooks/useUser";
import useScreenshot from "../../hooks/useScreenshot";
import { IoCloseCircle } from "react-icons/io5";
import { useParams } from "react-router";
import { FiCamera, FiMenu, FiX } from "react-icons/fi";
import type { responseScreenshotData } from "../../types/screenshot.types";
import type { TradeDetails } from "../../types/trade.types";
import ConfirmModal from "../ui/ConfirmModal";

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
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [scrrenShot, setScreenShot] = useState<responseScreenshotData[] | []>([])
  const [deleteModal,setDeleteModal] = useState(false);
  const [imageDeleteDetails,setImageDeleteDetails] = useState<any>(null)
  const [imageDeleteLoading,setImageDeleteLoading] = useState(false)
  const { toggleSidebar } = useSidebar();
  const { user } = useUser();
  const { addTrade, updateTrade } = useTrade();
  const { uploadScreenshots,deleteScreenshot, fetchScreenshots } = useScreenshot();
  const { id } = useParams()
  const [formData, setFormData] = useState<TradeDetails>({
    id: editData?.id || undefined,
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
    strategy: editData?.strategy || "",
    account_id: id


  });




  useEffect(() => {
    const getStoredScreenshot = async () => {
      const res:any = await fetchScreenshots(formData?.id)
      setScreenShot(res)
    }
    getStoredScreenshot()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name == 'stop_loss') {
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isThatSell = Number(formData.stop_loss) > Number(formData.entry_price) ? 'sell' : 'buy';

  const setType = (type: TradeType) => {
    setFormData((p) => ({ ...p, trade_type: isThatSell ? isThatSell : type }));
  };
  const setStatus = (status: TradeStatus) => {
    setFormData((p) => ({ ...p, status }));
  };

  const handleCancel = () => {
    setSearchQuery("");
    setFormData({
      id: undefined,
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
      strategy: '',
      account_id: ''
    });
    setIsOpen(false);
    setPreviews([]);
    setImages([]);
  };



  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (images.length >= 3) {
      toast.error("Max images reached");
      return;
    }

    const file = e.target.files?.[0];
    if (!file || (file.type !== "image/png" && file.type !== "image/jpeg")) {
      return toast.error("Invaild file fotmat");
    }

    const MAX_FILE_SIZE = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`File is Too large ,Max ${MAX_FILE_SIZE}MB`);
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

  const submitImage = async (id: number, imageData: FormData) => {
    try {
      await uploadScreenshots(id, imageData);
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
        let trade:TradeDetails | null = null;
        if (typeof updateTrade === "function") {
        trade =  await updateTrade(editData.id, payload);
          toast.success("Updated Succesfully");
        } else {
          console.warn("updateTrade method not found in hook registry.");
        }
        if(images.length>0){
          const imageData = new FormData();
          images.forEach((img) => {
            imageData.append('screenshots',img)
          })
          await submitImage(trade?.id,imageData)
        }
      } else {
        // if the editData or editData.id is not true it will run the addTrade -> like it will run the new trade
        const trade: any = await addTrade(payload);
        if (images.length === 0) {
          toast.success("New Trade was Created");
          return handleCancel();
        }

        const imageData = new FormData();

        images.forEach((image) => {
          imageData.append("screenshots", image);
        });
        await submitImage(trade.id, imageData);
        toast.success("New Trade Added with Screenshot");
      }

      handleCancel();
    } catch (err) {
      console.error("Database ingestion sequence rejected:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteScreenshot = async(img:responseScreenshotData) => {
    try{
      setImageDeleteLoading(true)
      await deleteScreenshot(img)
      const fil = [...scrrenShot].filter((s) => s.id !==img.id)
      setScreenShot(fil)
      setDeleteModal(false)
      setImageDeleteDetails(null)
      toast.success('ScreenShot delete Succesfully')
    }catch(err){
       toast.error('Failed to delete')
    }finally{
      setImageDeleteLoading(false)
    }
  }

  const handleFullScreen = (url: string) => {
    setFullScreenImage(url)
  }

  useEffect(() => {

    const handleClose = (e: any) => {
      if (e.key !== 'Escape') return;
      setIsOpen(false)


    }
    window.addEventListener('keydown', handleClose)

    return () => window.removeEventListener('keydown', handleClose)
  }, [])


  if(deleteModal) {
 return <ConfirmModal loading={imageDeleteLoading}  title="Delete Screenshot" description='This will permantely delete the screenshote of your Trade' onClose={() => setDeleteModal(false)} onDelete={() =>handleDeleteScreenshot(imageDeleteDetails)}/>
  }
  return (
    <div className="flex flex-col flex-1 min-h-screen bg-black text-zinc-100 font-sans antialiased selection:bg-zinc-800 selection:text-white">
      {/* Header */}
      <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-6 sm:px-8 shrink-0 bg-black/90 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-md border border-zinc-800 bg-zinc-950 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all cursor-pointer"
          >
            <FiMenu size={16} />
          </button>
          <div className="flex items-center gap-2 text-[11px] font-mono font-semibold tracking-[0.16em] text-zinc-500">
            <span>EXECUTION_TERMINAL //</span>
          </div>
        </div>
      </header>

      {/* Main Scrollable Canvas */}
      <div className="w-full flex-1 px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-6xl flex flex-col gap-7">

          {/* Title Block & Upload Button Row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
            <div className="flex flex-col gap-2">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-600">Execution registry</p>
              <h1 className="text-2xl font-semibold text-zinc-50 tracking-tight">
                {editData ? "Modify Trade" : "New Trade"}
              </h1>
              <p className="text-sm text-zinc-500 font-normal max-w-xl">
                {editData
                  ? "Update parameters for this specific system configuration data stream node."
                  : "Commit an active or closed ledger sequence to secure vault database analytics."}
              </p>
            </div>

            <label className="flex items-center gap-2 px-3 py-2 bg-zinc-950 hover:bg-zinc-900 text-zinc-300 text-[11px] font-mono font-semibold uppercase tracking-wider rounded-md border border-zinc-800 hover:border-zinc-700 cursor-pointer transition-all shrink-0 shadow-sm self-start sm:self-auto">
              <FiCamera className="h-3.5 w-3.5 text-zinc-500" />
              <span>Add Screenshot</span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleImage(e)}
              />
            </label>
          </div>

          {/* Master Workspace Form Container */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">

            {/* Section: Configuration Panels Grid Layout */}
            <div className="grid grid-cols-1 gap-5 items-start md:grid-cols-3">
              <AssetSelectionPanel
                editData={editData}
                tradeType={formData.trade_type}
                status={formData.status}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                isDropdownOpen={isDropdownOpen}
                setIsDropdownOpen={setIsDropdownOpen}
                setFormData={setFormData}
                setType={setType}
                setStatus={setStatus}
                isthatSell={isThatSell}
              />

              <PricingPanel formData={formData} handleChange={handleChange} />

              <RiskConfigurationPanel
                setFormData={setFormData}
                formData={formData}
                handleChange={handleChange}
              />
            </div>

            {/* Section: Image Previews Grid Layout (Only renders if active) */}
            {(scrrenShot.length > 0  || previews.length > 0) && (
              <div className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
                <span className="text-[10px] font-mono font-semibold tracking-[0.16em] text-zinc-500 uppercase">
                  Attached Media Nodes
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {scrrenShot.map((img, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative group border border-zinc-900 rounded-md bg-[#050505] p-2 aspect-video flex items-center justify-center overflow-hidden"
                    >
                      <button
                      onClick={() => {
                        setImageDeleteDetails(img)
                        setDeleteModal(true)
                      }}
                        type="button"
                        className="absolute top-2 right-2 z-10 p-1 bg-black/80 border border-zinc-800 rounded text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                      >
                        <IoCloseCircle size={16} />
                      </button>

                      <img
                        onClick={() => handleFullScreen(img.public_url)}
                        src={img?.public_url}
                        alt={`screenshot-${index}`}
                        className="max-w-full max-h-full object-contain rounded-sm"
                      />
                    </div>

))}


                  {previews.map((img, index) => (
                    <div key={index} className="relative group border border-zinc-900 rounded-md bg-[#050505] p-2 aspect-video flex items-center justify-center overflow-hidden">
                      <button
                        type="button"
                        onClick={() => handleDeleteLocalImage(index)}
                        className="absolute top-2 right-2 z-10 p-1 bg-black/80 border border-zinc-800 rounded text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer"
                      >
                        <IoCloseCircle size={16} />
                      </button>
                      <img onClick={() => handleFullScreen(img)} src={img} alt={`preview-${index}`} className="max-w-full max-h-full object-contain rounded-sm" />
                    </div>
                  ))}
                </div>
                {fullScreenImage && (
                  <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-300"
                    onClick={() => setFullScreenImage(null)}
                  >
                    <button
                      className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
                      onClick={() => setFullScreenImage(null)}
                    >
                      <FiX size={24} />
                    </button>

                    {/* Full Screen Image */}
                    <img
                      src={fullScreenImage}
                      alt="Full Screen Evidence"
                      className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl border border-zinc-800"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Section: Commentary Node Block */}
            <div className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl p-5 flex flex-col gap-4 shadow-sm">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500">
                  Post-Execution Commentary
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Log internal psychological drivers, structural constraints..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full rounded-md border border-zinc-800 bg-black p-3.5 text-[13px] font-mono leading-relaxed text-zinc-100 shadow-sm outline-none transition-all placeholder:text-zinc-700 hover:border-zinc-700 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-800/70 resize-none"
                />
              </div>
            </div>

            {/* Section: Premium Footer Controls */}
            <div className="w-full bg-zinc-950/60 border border-zinc-900 rounded-xl px-5 py-3.5 flex items-center justify-between text-xs font-mono font-medium text-zinc-500 shadow-sm">
              <span className="text-[10px] uppercase tracking-widest text-zinc-600">Terminal Registry Stream Node</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="text-zinc-500 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-zinc-100 text-black hover:bg-white disabled:bg-zinc-900 disabled:text-zinc-600 font-sans font-semibold text-xs px-4 py-2.5 rounded-md transition-colors cursor-pointer shadow-sm"
                >
                  {loading ? "Vaulting Core..." : editData ? "Save Changes" : "Commit"}
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
