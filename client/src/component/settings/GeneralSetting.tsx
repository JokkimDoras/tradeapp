import { useState, useEffect } from "react";
import useProfile from "../../hooks/useUserSettings";
import { useUser } from "../../hooks/useUser";
import { toast } from "sonner";

export default function GeneralSetting() {
  const { user, setUser } = useUser();
  const [formProfile, setFormProfile] = useState({
    full_name: user.full_name,
    country: user.country,
    bio: user.bio,
  });
  const { updateSettings, loading } = useProfile();

  useEffect(() => {
    setFormProfile({
      full_name: user.full_name,
      country: user.country,
      bio: user.bio,
    });
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "OP";

  const handleClick = async () => {
    try {
      await updateSettings(formProfile);
      setUser((prev) => ({
        ...prev,
        ...formProfile,
      }));
      toast.success("Changed Successfully");
    } catch (error: any) {
      const serverMessage = error?.response?.data?.message;
      const generalMessage = error?.message;

      toast.error(
        serverMessage || generalMessage || "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="flex flex-col gap-px">
      {/* Avatar */}
      <div className="flex items-center justify-between py-6 border-b border-zinc-900">
        <div>
          <p className="text-sm font-medium text-white">Avatar</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Click to upload a profile picture.
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-sm font-semibold text-white">
          {initials}
        </div>
      </div>

      {/* Full name */}
      <div className="flex items-center justify-between py-6 border-b border-zinc-900">
        <div className="flex-1 max-w-xs">
          <p className="text-sm font-medium text-white">Full name</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Your display name across TradeVault.
          </p>
        </div>
        <input
          onChange={(e) => handleChange(e)}
          name="full_name"
          value={formProfile.full_name}
          type="text"
          placeholder="Your full name"
          className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all"
        />
      </div>

      {/* Country */}
      <div className="flex items-center justify-between py-6 border-b border-zinc-900">
        <div className="flex-1 max-w-xs">
          <p className="text-sm font-medium text-white">Country</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            Your region for localization.
          </p>
        </div>
        <select
          name="country"
          onChange={(e) => handleChange(e)}
          value={formProfile.country}
          className="w-64 h-9 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 text-sm text-white focus:outline-none transition-all appearance-none cursor-pointer"
        >
          <option value="">Select country</option>
          <option>India</option>
          <option>United States</option>
          <option>United Kingdom</option>
          <option>Australia</option>
          <option>Singapore</option>
          <option>UAE</option>
        </select>
      </div>

      {/* Bio */}
      <div className="flex items-start justify-between py-6 border-b border-zinc-900">
        <div className="flex-1 max-w-xs">
          <p className="text-sm font-medium text-white">Bio</p>
          <p className="text-xs text-zinc-500 mt-0.5">
            A short description about your trading style.
          </p>
        </div>
        <textarea
          onChange={(e) => handleChange(e)}
          name="bio"
          value={formProfile.bio}
          rows={3}
          placeholder="e.g. London session breakout trader, 3 years experience."
          className="w-64 bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-zinc-600 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-700 focus:outline-none transition-all resize-none"
        />
      </div>

      {/* Save */}
      <div className="flex justify-end pt-6">
        <button
          onClick={handleClick}
          disabled={loading}
          className="flex items-center justify-center gap-2 h-9 px-5 bg-white hover:bg-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400 disabled:cursor-not-allowed text-black text-sm font-medium rounded-lg transition-all"
        >
          {loading ? (
            <>
              {/* This is a standard Tailwind animated spinner */}
              <svg
                className="animate-spin h-4 w-4 text-zinc-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
}
