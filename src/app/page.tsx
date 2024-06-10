"use client";

import { useState } from "react";

import Sidebar from "@components/sidebar";
import Table from "@components/table";

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <div className="flex">
      <Sidebar setSidebarCollapsed={setSidebarCollapsed} />
      <Table sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
}
