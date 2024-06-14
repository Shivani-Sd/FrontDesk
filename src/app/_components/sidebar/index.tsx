import { Dispatch, SetStateAction, useState } from "react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

import {
  ArrowLeftRight,
  Calendar,
  FrontDeskLogo,
  Globe,
  Inbox,
  LayoutDashboard,
  Open,
  SplitView,
  Subscriptions,
  User,
  Waitlist,
} from "@assets";
import ChevronDown from "@assets/chevron-down.svg";
import Help from "@assets/help.svg";

interface SidebarProps {
  setSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
}

enum SidebarItemName {
  Orders = "Orders",
  Subscriptions = "Subscriptions",
  Calendar = "Calendar",
  Waitlist = "Waitlist",
}

interface SidebarItem {
  name: SidebarItemName;
  icon: string | StaticImport;
}

const sidebarItems: SidebarItem[] = [
  {
    name: SidebarItemName.Orders,
    icon: Inbox,
  },
  {
    name: SidebarItemName.Subscriptions,
    icon: Subscriptions,
  },
  {
    name: SidebarItemName.Calendar,
    icon: Calendar,
  },
  {
    name: SidebarItemName.Waitlist,
    icon: Waitlist,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ setSidebarCollapsed }) => {
  const [showMiniSidebar, setShowMiniSidebar] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<SidebarItemName | null>(
    null
  );

  const handleSelectItem = (item: SidebarItemName) => {
    setSelectedItem(item);
  };

  // Collapse sidebar
  const handleShowMiniBar = () => {
    setShowMiniSidebar((prev) => !prev);
    setSidebarCollapsed((prev) => !prev);
  };

  // Function to render sidebar options
  const getSidebarItem = (sidebarItem: SidebarItem) => {
    const { name, icon } = sidebarItem;

    return (
      <div
        className={`w-full flex items-center py-1.5 px-2 gap-2 ${
          selectedItem === name ? "bg-white border-b border-light_border" : ""
        } ${showMiniSidebar ? "h-[32px] flex justify-center" : ""}`}
        onClick={() => handleSelectItem(name)}
        key={name}
      >
        <Image src={icon} alt={name} priority />
        {!showMiniSidebar && (
          <div className="text-xs font-medium leading-5 text-left">{name}</div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`h-[100vh] flex flex-col justify-start gap-2 bg-sky_blue navbar-transition fixed ${
        showMiniSidebar ? "w-[64px]" : "w-[228px]"
      }`}
      role="navigation"
      aria-label="Main Navigation"
    >
      <div
        className={`h-[64px] p-2 ${
          showMiniSidebar ? "flex justify-center" : ""
        }`}
        role="banner"
      >
        <div
          className={`w-full p-2 pr-0 flex items-center navbar-transition ${
            showMiniSidebar ? "justify-center p-0" : "justify-around gap-2"
          }`}
        >
          <Image src={FrontDeskLogo} alt="Logo" priority />
          {!showMiniSidebar && (
            <>
              <div className="w-[150px] h-6 font-poppins text-base font-semibold leading-6 text-left">
                Front·Desk
              </div>
              <Image
                src={SplitView}
                alt="Split View"
                onClick={handleShowMiniBar}
                role="button"
                aria-label="Toggle Sidebar"
              />
            </>
          )}
        </div>
      </div>
      <div
        className={`h-full flex flex-col p-2 justify-between navbar-transition ${
          showMiniSidebar ? "gap-6" : ""
        }`}
      >
        <div
          className={`flex flex-col gap-y-6 navbar-transition ${
            showMiniSidebar ? "justify-center" : ""
          }`}
        >
          <div
            className={`navbar-transition ${
              !showMiniSidebar ? "w-[212px] h-[83px]" : ""
            }`}
          >
            <div
              className={`flex items-center p-2 pl-3 rounded-md border-b border-light_border bg-white navbar-transition ${
                showMiniSidebar
                  ? "justify-center w-[48px] h-[56px]"
                  : "justify-between w-[212px]"
              }`}
              role="button"
              aria-label="Location Details"
            >
              {!showMiniSidebar && (
                <div className="text-xs leading-5 text-smokey_black font-medium">
                  Location Name
                </div>
              )}
              <Image src={ArrowLeftRight} alt="Left Right Arrow" priority />
            </div>
            <div className="flex justify-center">
              <div
                className={`gap-1 flex rounded card-border shadow-shadow_light bg-light_blue ${
                  showMiniSidebar ? "w-[29px] p-1.5" : "w-[193px] px-3 py-1.5"
                }`}
              >
                <div
                  className={`${
                    !showMiniSidebar ? "flex flex-col gap-1.5" : ""
                  }`}
                >
                  {!showMiniSidebar && (
                    <div className="flex items-center gap-2 font-helvetica">
                      <div className="text-base font-bold leading-5 text-left text-smokey_black">
                        8:30 AM
                      </div>
                      <div className="text-sm font-medium text-left">
                        Tue 20 Jan
                      </div>
                    </div>
                  )}
                  <div
                    className={`${
                      !showMiniSidebar ? "w-[100px] flex gap-1" : ""
                    }`}
                  >
                    <Image src={Globe} alt="Globe" priority />
                    {!showMiniSidebar && (
                      <div className="text-xs font-medium text-left text-smokey_black">
                        UTC: +5 hours
                      </div>
                    )}
                  </div>
                </div>
                {!showMiniSidebar && (
                  <div className="flex items-end">
                    <Image src={ChevronDown} alt="Chevron Down" />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="w-full h-full gap-0.5">
            {sidebarItems.map((sidebarItem) => getSidebarItem(sidebarItem))}
          </div>
        </div>
        <div
          className={`w-full flex items-center py-1.5 px-2
          ${
            showMiniSidebar
              ? "h-[32px] justify-center"
              : "justify-between gap-2"
          }`}
        >
          {!showMiniSidebar && (
            <div className="flex items-center gap-2">
              <Image src={LayoutDashboard} alt={"Dashboard Layout"} priority />
              <div className="text-medium font-medium text-left">Dashboard</div>
            </div>
          )}
          <Image src={Open} alt={"Open in New Tab"} />
        </div>
      </div>
      <div className="p-2">
        <div
          className={`flex px-2 py-2.5 shadow-shadow_light bg-white ${
            showMiniSidebar
              ? "justify-center"
              : "w-[212px] justify-between gap-2"
          }`}
        >
          <Image src={User} alt="User" priority />
          {!showMiniSidebar && (
            <>
              <div className="flex flex-col">
                <div className="text-medium font-medium text-left text-light_black">
                  Admin name
                </div>
                <div className="text-medium font-normal text-left text-gray_100">
                  adminname@mail.com
                </div>
              </div>
              <Image src={ChevronDown} alt="Chevron Down" />
            </>
          )}
        </div>
        <div
          className={`flex px-2 py-1.5 navbar-transition ${
            showMiniSidebar ? "justify-center" : "gap-2"
          }`}
        >
          <Image src={Help} alt="Help" />
          {!showMiniSidebar && (
            <div className="flex flex-col">
              <div className="text-medium font-normal text-left text-smokey_black">
                Help Center
              </div>
              <div className="text-small font-normal text-left text-gray_100">
                @2024 Omnify.Inc.{" "}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
