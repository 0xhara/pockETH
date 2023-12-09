import { cn } from "@/lib/utils";
import Link from "next/link";

function Logo({ className }) {
  return (
    <Link href={"/"}>
      <span
        className={cn(
          "monster text-[2rem] font-bold tracking-wider",
          className
        )}
      >
        pock<span className="text-accent font-bold">ETH</span>
      </span>
    </Link>
  );
}

export default Logo;
