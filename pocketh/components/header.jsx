import { Bitcoin, Github, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import Logo from "./logo";

function Header() {
  return (
    <header className="w-full z-[999] justify-between backdrop-blur-xl flex items-center top-0 left-0 right-0 sticky p-4 lg:pl-[4rem] lg:pr-[4rem]">
      <Logo />

      <div className="lg:flex hidden  gap-4">
        <Button variant="outlined" className="border-white flex  gap-2 border">
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
