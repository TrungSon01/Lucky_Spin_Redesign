import { useState } from "react";
import {
  ChevronRight,
  User,
  Settings,
  Bell,
  Shield,
  LogOut,
} from "lucide-react";

export default function Account() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="h-screen w-full bg-gray-50 flex flex-col">
      {/* Header - native iOS style */}
      <div className="px-4 pt-6 pb-3 bg-white">
        <h1 className="text-xl font-semibold">Account</h1>
      </div>

      {/* Profile Section */}
      <div className="bg-white px-4 py-4 flex items-center gap-3 border-b">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <User size={20} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-base">Nguyễn Trung Sơn</p>
          <p className="text-sm text-gray-500">son@email.com</p>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </div>

      {/* Settings List */}
      <div className="mt-4 bg-white divide-y">
        <Row icon={<Bell size={18} />} label="Notifications">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="sr-only peer"
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-black transition" />
          </label>
        </Row>

        <Row icon={<Settings size={18} />} label="General" />
        <Row icon={<Shield size={18} />} label="Privacy & Security" />
      </div>

      {/* Logout Button fixed bottom (no hidden CTA) */}
      <div className="mt-auto p-4 bg-white border-t">
        <button className="w-full py-3 rounded-xl bg-black text-white font-medium flex items-center justify-center gap-2">
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </div>
  );
}

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between px-4 py-4">
      <div className="flex items-center gap-3">
        <div className="text-gray-600">{icon}</div>
        <span className="text-base">{label}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        {children || <ChevronRight size={18} />}
      </div>
    </div>
  );
}
