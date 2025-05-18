
function Loader() {
  return (
<div className="flex items-center justify-center min-h-screen">
  <div className="relative">
    <div className="relative w-32 h-32">
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-r-mainColor border-b-mainColor animate-spin"
        style={{animationDuration: "3s"}}
      ></div>
      <div
        className="absolute w-full h-full rounded-full border-[3px] border-gray-100/10 border-t-mainColor animate-spin"
        style={{animationDuration: "2s", animationDirection: "reverse"}}
      ></div>
    </div>

    <div
      className="absolute inset-0 bg-gradient-to-tr from-mainColor/10 via-transparent to-mainColor/5 animate-pulse rounded-full blur-sm"
    ></div>
  </div>
</div>

  )
}

export default Loader