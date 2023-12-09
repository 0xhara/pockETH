import { Bitcoin, Github, Leaf } from "lucide-react";
import { Button } from "./ui/button";

function Header() {
  return (
    <header className="w-full justify-between flex items-center top-0 left-0 right-0 sticky p-4 pl-[4rem] pr-[4rem]">
      <span className="monster text-[2rem] font-bold tracking-wider">
        pock<span className="text-accent font-bold">ETH</span>
      </span>

      <div className="flex gap-4">
        <Button variant="outlined" className="border-white flex gap-2 border">
          <Github />
          Contribute
        </Button>
        <Button className="flex gap-2 items-center">
          Get Started
          <Leaf />
        </Button>
      </div>
    </header>
  );
}

export default Header;
