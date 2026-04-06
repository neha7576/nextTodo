"use client";

type Props = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({ message, type = "success" }: Props) {
  return (
    <div
      className={`fixed bottom-5 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white z-50
      ${type === "success" ? "bg-green-500" : "bg-red-500"}`}
    >
      {message}
    </div>
  );
}