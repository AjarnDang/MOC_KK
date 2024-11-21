"use client";

import React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import Logo from "@/public/imgs/logo.png";
import Image from "next/image";

export default function Navbar() {
  const itemRenderer = (item) => (
    
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );
  const items = [
    {
      label: "เมนู 1",
      icon: "pi pi-star",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Core",
          icon: "pi pi-bolt",
          shortcut: "⌘+S",
          template: itemRenderer,
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
          shortcut: "⌘+B",
          template: itemRenderer,
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
          shortcut: "⌘+U",
          template: itemRenderer,
        },
        {
          separator: true,
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
              badge: 2,
              template: itemRenderer,
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
              badge: 3,
              template: itemRenderer,
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      badge: 3,
      template: itemRenderer,
    },
  ];

  const start = (
    <Image alt="logo" src={Logo} height={0} width={0} className="mr-2 w-12" />
  );
  const end = (
    <div className="flex align-items-center gap-4">
      <a className="flex align-items-center p-menuitem-link">
        <span className="pi pi-sign-in" />
        <span className="mx-2">Sign in</span>
      </a>
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="card fixed top-0 left-0 w-full z-50">
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
