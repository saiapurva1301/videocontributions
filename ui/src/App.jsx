import { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { useSearchParams } from "react-router-dom";

const PAGE_LIMIT = 14;

export default function App() {
  const [contributions, setContributions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [titleSearch, setTitleSearch] = useState(searchParams.get("title") || "");
  const [descriptionSearch, setDescriptionSearch] = useState(searchParams.get("description") || "");
  const [ownerSearch, setOwnerSearch] = useState(searchParams.get("owner") || "");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "0"));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const params = {
          skip: page * PAGE_LIMIT,
          limit: PAGE_LIMIT,
        };
        if (titleSearch) params.title = titleSearch;
        if (descriptionSearch) params.description = descriptionSearch;
        if (ownerSearch) params.owner = ownerSearch;

        const res = await axios.get("http://localhost:8000/contributions/", {
          params,
        });
        setContributions(res.data.contributions);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Error fetching contributions", err);
      }
    };
    fetchContributions();

    const newParams = {};
    if (titleSearch) newParams.title = titleSearch;
    if (descriptionSearch) newParams.description = descriptionSearch;
    if (ownerSearch) newParams.owner = ownerSearch;
    if (page) newParams.page = page.toString();
    setSearchParams(newParams);
  }, [titleSearch, descriptionSearch, ownerSearch, page]);

  const formatDate = (dateStr) => format(new Date(dateStr), "PPpp");

  const getStatus = (start, end) => {
    const now = new Date();
    const s = new Date(start);
    const e = new Date(end);
    if (now < s) return "Scheduled";
    if (now >= s && now <= e) return "Active";
    return "Complete";
  };

  return (
    <div className="p-6 max-w-screen-l mx-auto font-sans bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">🎥 Video Contributions</h1>

      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="🔍 Title..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={titleSearch}
          onChange={(e) => {
            setPage(0);
            setTitleSearch(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="📝 Description..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={descriptionSearch}
          onChange={(e) => {
            setPage(0);
            setDescriptionSearch(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="🎬 Owner..."
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={ownerSearch}
          onChange={(e) => {
            setPage(0);
            setOwnerSearch(e.target.value);
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contributions.map((c) => (
          <div key={c.id} className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-bold text-blue-700 mb-2">{c.title}</h2>
            <p className="text-gray-600 text-sm mb-4 italic">{c.description}</p>
            <div className="text-sm text-gray-700 space-y-1">
              <p><span className="font-semibold">🕒 Start:</span> {formatDate(c.startTime)}</p>
              <p><span className="font-semibold">⏰ End:</span> {formatDate(c.endTime)}</p>
              <p><span className="font-semibold">🎬 Owner:</span> {c.owner}</p>
              <p><span className="font-semibold">📺 Status:</span> <span className="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs font-semibold">{getStatus(c.startTime, c.endTime)}</span></p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-10">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-4 py-2 text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50"
        >
          ← Previous
        </button>
        <span className="text-gray-700 font-medium">Page {page + 1}</span>
        <button
          onClick={() => setPage((p) => (p + 1) * PAGE_LIMIT < total ? p + 1 : p)}
          disabled={(page + 1) * PAGE_LIMIT >= total}
          className="px-4 py-2 text-black bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 disabled:opacity-50"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
