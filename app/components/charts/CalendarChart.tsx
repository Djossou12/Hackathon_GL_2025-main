"use client";

export function CalendarChart({ data }: { data: { diagnosis: string; count: number }[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data.slice(0, 6).map((item) => (
        <div key={item.diagnosis} className="bg-white p-4 rounded-lg shadow">
          <h3 className="font-medium text-gray-900">{item.diagnosis}</h3>
          <div className="mt-2 flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, item.count)}%` }}
              ></div>
            </div>
            <span className="ml-2 text-sm font-medium text-gray-700">
              {item.count}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}