import React, { useState } from "react";

// Admin Dashboard styled to echo the landing page (amber/white + emerald accents)
export default function AdminDashboard({ onGoToProducts, onGoToUsers, onGoToOrders, navigate, darkMode, setDarkMode }) {
  const [profileImage, setProfileImage] = useState("https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff");
  
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const theme = darkMode
    ? {
        bg: "bg-slate-900",
        text: "text-slate-200",
        cardBg: "bg-slate-800",
        border: "border-slate-700",
        headerText: "text-white",
        heading: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300 drop-shadow",
        sectionHeading: "text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300",
        textStrong: "text-slate-100",
        textMuted: "text-slate-300",
        tableHeaderText: "text-slate-300",
        sectionBg: "bg-slate-800",
        sidebarBg: "bg-slate-900",
        sidebarText: "text-slate-200",
        sidebarHover: "hover:bg-slate-800/80",
        sidebarActive: "bg-slate-800 text-white",
        accent: "bg-emerald-600 hover:bg-emerald-500",
        subtle: "bg-slate-800/60"
      }
    : {
        bg: "bg-white",
        text: "text-gray-800",
        cardBg: "bg-white",
        border: "border-gray-100",
        headerText: "text-gray-800",
        heading: "text-gray-800",
        sectionHeading: "text-gray-800",
        textStrong: "text-gray-800",
        textMuted: "text-gray-600",
        tableHeaderText: "text-gray-600",
        sectionBg: "bg-gray-50",
        sidebarBg: "bg-white",
        sidebarText: "text-gray-800",
        sidebarHover: "hover:bg-gray-100",
        sidebarActive: "bg-emerald-600 text-white",
        accent: "bg-emerald-600 hover:bg-emerald-700",
        subtle: "bg-gray-50"
      };
  const stats = [
    { label: "Total Books", value: "1,230" },
    { label: "Sales", value: "$32,500" },
    { label: "Orders", value: "1,520" },
    { label: "Customers", value: "820" }
  ];

  const orders = [
    { id: "ORD-1001", customer: "Emma Johnson", amount: "$39.99", status: "Pending" },
    { id: "ORD-1002", customer: "Noah Smith", amount: "$54.50", status: "Shipped" },
    { id: "ORD-1003", customer: "Olivia Davis", amount: "$29.99", status: "Delivered" },
    { id: "ORD-1004", customer: "James Miller", amount: "$18.75", status: "Canceled" }
  ];

  const badgeClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border border-amber-200";
      case "Shipped":
        return "bg-sky-100 text-sky-700 border border-sky-200";
      case "Delivered":
        return "bg-emerald-100 text-emerald-700 border border-emerald-200";
      case "Canceled":
        return "bg-rose-100 text-rose-700 border border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200";
    }
  };

  const onGoToSettings = () => {
    console.log("Settings button clicked");
    window.history.pushState({}, "", "/admin/settings");
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const onGoToDiscounts = () => {
    console.log("Discounts button clicked");
    window.history.pushState({}, "", "/admin/discounts");
    window.dispatchEvent(new PopStateEvent('popstate'));
  };
  
  const onGoToReviews = () => {
    console.log("Reviews button clicked");
    window.history.pushState({}, "", "/admin/reviews");
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const navItems = [
    { label: "Dashboard", onClick: null },
    { label: "Product Management", onClick: onGoToProducts },
    { label: "Order Management", onClick: onGoToOrders },
    { label: "User Management", onClick: onGoToUsers },
    { label: "Seller Management", onClick: null },
    { label: "Reviews", onClick: onGoToReviews },
    { label: "Discounts", onClick: onGoToDiscounts },
    { label: "Reports for sellers feedback", onClick: null },
    { label: "Settings", onClick: onGoToSettings }
  ];

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text}`}>
      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 min-h-screen ${theme.sidebarBg} ${theme.sidebarText} p-6 hidden md:block`}>
          <h2 className="text-xl font-bold mb-6">ADMIN</h2>
          <nav className="space-y-2">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.onClick || undefined}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors transform hover:scale-105 ${
                  item.label === "Dashboard" ? theme.sidebarActive : theme.sidebarHover
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <header className="mb-6 flex items-center justify-between">
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${theme.heading}`}>Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input 
                  type="file" 
                  id="profile-upload" 
                  className="hidden" 
                  accept="image/*" 
                  onChange={handleProfileImageChange}
                />
                <label 
                  htmlFor="profile-upload" 
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 ${theme.border} cursor-pointer transition-transform hover:scale-110 block`} 
                  title="Click to change profile picture"
                >
                  <img 
                    src={profileImage} 
                    alt="Admin Profile" 
                    className="w-full h-full object-cover"
                  />
                </label>
              </div>
            </div>
          </header>

          {/* Stat cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {stats.map((s) => (
              <div
                key={s.label}
                className={`${theme.cardBg} rounded-xl shadow-md p-5 border ${theme.border}`}
              >
                <p className={`text-sm ${theme.textMuted}`}>{s.label}</p>
                <p className={`text-2xl font-bold ${theme.textStrong} mt-2`}>{s.value}</p>
              </div>
            ))}
          </section>

          {/* Enhanced Revenue chart */}
          <section className={`${theme.cardBg} rounded-xl shadow-lg border ${theme.border} p-6 md:p-8 relative overflow-hidden`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-2xl font-extrabold tracking-tight ${theme.sectionHeading}`}>Revenue Analytics</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                  <span className={theme.textMuted}>Revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className={theme.textMuted}>Growth</span>
                </div>
              </div>
            </div>
            
            <div className="relative h-80 w-full">
              {/* Background grid */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" className="w-full h-full">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke={darkMode ? "#374151" : "#e5e7eb"} strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
              
              {/* Main chart */}
              <svg viewBox="0 0 800 300" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#34d399" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#6ee7b7" stopOpacity="0.1" />
                  </linearGradient>
                  <linearGradient id="growthGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.1" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Revenue area */}
                <path 
                  d="M0,200 C100,150 200,180 300,120 C400,60 500,100 600,80 C700,60 800,100 800,100 L800,300 L0,300 Z" 
                  fill="url(#revenueGradient)" 
                  className="animate-pulse"
                />
                
                {/* Revenue line */}
                <path 
                  d="M0,200 C100,150 200,180 300,120 C400,60 500,100 600,80 C700,60 800,100" 
                  stroke="#10b981" 
                  strokeWidth="4" 
                  fill="none" 
                  filter="url(#glow)"
                  className="drop-shadow-lg"
                />
                
                {/* Growth line */}
                <path 
                  d="M0,220 C100,200 200,210 300,180 C400,150 500,160 600,140 C700,120 800,130" 
                  stroke="#3b82f6" 
                  strokeWidth="3" 
                  fill="none" 
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
                
                {/* Data points */}
                {[0,100,200,300,400,500,600,700,800].map((x, i) => {
                  const y = i % 2 === 0 ? 200 - (i * 15) : 220 - (i * 10);
                  return (
                    <circle 
                      key={i} 
                      cx={x} 
                      cy={y} 
                      r="4" 
                      fill="#10b981" 
                      className="drop-shadow-md transition-all duration-300"
                    />
                  );
                })}
                
                {/* Y-axis labels */}
                {[0, 50, 100, 150, 200].map((value, i) => (
                  <text 
                    key={i} 
                    x="-10" 
                    y={200 - (value * 0.8)} 
                    textAnchor="end" 
                    className={`text-xs fill-current ${theme.textMuted}`}
                  >
                    ${value}k
                  </text>
                ))}
                
                {/* X-axis labels */}
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'].map((month, i) => (
                  <text 
                    key={i} 
                    x={i * 100} 
                    y="290" 
                    textAnchor="middle" 
                    className={`text-xs fill-current ${theme.textMuted}`}
                  >
                    {month}
                  </text>
                ))}
              </svg>
              
              {/* Floating stats */}
              <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <div className="text-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="font-semibold text-emerald-600">+12.5%</span>
                  </div>
                  <div className="text-xs text-gray-500">vs last month</div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}