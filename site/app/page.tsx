import { Header } from "@/components/Header";

export default function Home() {

  return (
    <>
      <Header />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 relative overflow-visible">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-xl bg-muted bg-opacity-50 hover:bg-opacity-100 transition-transform duration-300 transform hover:scale-125 hover:z-10 text-center flex justify-center items-center"
              style={{
                transformOrigin: getTransformOrigin(i),
              }}
            >
              <div className="bg-white w-4/5 h-4/5 rounded-xl p-4"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  function getTransformOrigin(index: number) {
    const column = index % 3; // 0, 1, 2 (left, center, right)
    const row = Math.floor(index / 3); // 0, 1 (top, bottom)

    let origin = "";

    if (row === 0) origin += "top ";
    else origin += "bottom ";

    if (column === 0) origin += "left";
    else if (column === 1) origin += "center";
    else origin += "right";

    return origin;
  }
}
