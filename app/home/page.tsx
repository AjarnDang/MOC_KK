"use client";

import React from "react";
import { Button } from "primereact/button";

export default function Home() {
  const handleClick = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="content text-center">
        <h1 className="text-2xl font-bold">ยินดีต้อนรับ!</h1>
        <p className="mb-4">กรุณาล็อคอิน เพื่อเข้าใช้งานระบบ</p>
        <Button
          label="เข้าสู่ระบบ"
          link
          aria-label="เข้าสู่ระบบ"
          className="btn bg-gray-800 text-white px-4 py-2"
          onClick={handleClick}
        />
      </section>
    </div>
  );
}
