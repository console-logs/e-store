import Features from "@/app/about/_components/features";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return (
    <div className="px-4 sm:px-32">
      {children}
      <Features />
    </div>
  );
}
