import { cn } from "@/lib/utils";
import Link from "next/link";

function Logo({ className }) {
  return (
    <Link href={"/"}>
      <span
        className={cn(
          "monster  lg:text-[2rem] font-bold tracking-wider",
          className
        )}
      >
        PockETH 2gETHER
      </span>
    </Link>
  );
}

export default Logo;
