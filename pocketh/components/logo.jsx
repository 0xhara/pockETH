import { cn } from "@/lib/utils";

function Logo({ className }) {
  return (
    <span
      className={cn("monster text-[2rem] font-bold tracking-wider", className)}
    >
      pock<span className="text-accent font-bold">ETH</span>
    </span>
  );
}

export default Logo;
