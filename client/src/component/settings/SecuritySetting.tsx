import { useUser } from "../../hooks/useUser"

export default function SecuritySetting () {
    const { user } = useUser();

    return (
        <div className="flex flex-col gap-px">
          {/* Email */}
          <div className="flex items-center justify-between py-6 border-b border-zinc-900">
            <div className="flex-1 max-w-xs">
              <p className="text-sm font-medium text-white">Email address</p>
              <p className="text-xs text-zinc-500 mt-0.5">{user.email || "—"}</p>
            </div>
            <button className="h-9 px-4 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm rounded-lg transition-all">
              Change email
            </button>
          </div>

          {/* Password */}
          <div className="flex items-center justify-between py-6 border-b border-zinc-900">
            <div className="flex-1 max-w-xs">
              <p className="text-sm font-medium text-white">Password</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Last updated 30 days ago.
              </p>
            </div>
            <button className="h-9 px-4 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-900 text-zinc-300 hover:text-white text-sm rounded-lg transition-all">
              Change password
            </button>
          </div>

          {/* Plan */}
          <div className="flex items-center justify-between py-6 border-b border-zinc-900">
            <div className="flex-1 max-w-xs">
              <p className="text-sm font-medium text-white">Plan</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                You are on the Free plan.
              </p>
            </div>
            <span className="h-9 px-4 flex items-center text-xs text-zinc-500 border border-zinc-900 rounded-lg">
              Free
            </span>
          </div>

          {/* Member since */}
          <div className="flex items-center justify-between py-6 border-b border-zinc-900">
            <div className="flex-1 max-w-xs">
              <p className="text-sm font-medium text-white">Member since</p>
              <p className="text-xs text-zinc-500 mt-0.5">June 1, 2025</p>
            </div>
          </div>

          {/* Danger zone */}
          <div className="mt-8 border border-red-950 rounded-lg overflow-hidden">
            <div className="px-5 py-4 border-b border-red-950">
              <p className="text-sm font-medium text-red-500">
                Delete account
              </p>
              <p className="text-xs text-zinc-600 mt-0.5">
                Permanently deletes your account and all trade data. This
                cannot be undone.
              </p>
            </div>
            <div className="px-5 py-4 flex items-center justify-between bg-red-950/10">
              <p className="text-xs text-zinc-600">
                Type your email to confirm deletion.
              </p>
              <button className="h-9 px-4 border border-red-900 hover:bg-red-950/40 text-red-500 text-sm rounded-lg transition-all">
                Delete account
              </button>
            </div>
          </div>
        </div>
      )
}