export default function RoutesPage() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Citywalk 探索</h2>
      {[1,2,3].map((i) => (
        <div key={i} className="bg-white p-4 rounded-xl shadow-sm mb-4 border">
          <div className="h-32 bg-gray-100 rounded-lg mb-2"/>
          <h3 className="font-bold">胡同里的慢时光</h3>
          <p className="text-xs text-gray-500">已被 120 人走过 · 4.2km</p>
          <button className="mt-3 w-full border py-2 rounded-lg text-sm hover:bg-black hover:text-white transition">去散步</button>
        </div>
      ))}
    </div>
  );
}
