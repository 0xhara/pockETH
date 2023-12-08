function page() {
  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center">
      <div className="max-w-[1440px] flex flex-col gap-8">
        <span>
          Welcome Back, <span className="font-bold">0xDeK7</span>
        </span>
        <span className="text-[4rem] font-bold monster">0 ETH</span>
        <div>
          <span>Available to Spend</span>
        </div>
      </div>
    </div>
  );
}

export default page;
