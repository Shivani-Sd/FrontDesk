"use client";

import { useState } from "react";

import Sidebar from "@components/sidebar";
import Table from "@components/table";

export default function Home() {
  const [showMiniSidebar, setShowMiniSidebar] = useState<boolean>(false);

  return (
    <div className="flex">
      <Sidebar
        showMiniSidebar={showMiniSidebar}
        setShowMiniSidebar={setShowMiniSidebar}
      />
      <Table showMiniSidebar={showMiniSidebar} />
    </div>
  );
}
