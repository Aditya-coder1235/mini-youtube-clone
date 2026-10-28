import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { SearchX, RotateCcw, Radio, Flame, Clock, Heart } from "lucide-react";
import VideoCard, { VideoCardSkeleton } from "../components/VideoCard";
import { API } from "../utils";

const sortTabs = [
  { key: "", label: "All", icon: Radio },
  { key: "trending", label: "Trending", icon: Flame },
  { key: "recent", label: "Fresh", icon: Clock },
  { key: "liked", label: "Top liked", icon: Heart },
];

const AllVideos = () => {
  const [videos, setVideos] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = (searchParams.get("q") || "").trim().toLowerCase();
  const sort = searchParams.get("sort") || "";

  async function fetchAllVideos() {
    setPending(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/api/video/getAll`, {
        withCredentials: true,
      });
      setVideos(res.data.videos || []);
    } catch (err) {
      console.error(err);
      setError("Couldn't reach the server. Make sure the backend is running.");
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    fetchAllVideos();
  }, []);

  const visible = useMemo(() => {
    let list = [...videos];
    if (query) {
      list = list.filter(
        (v) =>
          (v.title || "").toLowerCase().includes(query) ||
          (v.description || "").toLowerCase().includes(query)
      );
    }
    if (sort === "trending") list.sort((a, b) => (b.views || 0) - (a.views || 0));
    else if (sort === "liked") list.sort((a, b) => (b.likes || 0) - (a.likes || 0));
    else if (sort === "recent")
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return list;
  }, [videos, query, sort]);

  const setSort = (key) => {
    const next = new URLSearchParams(searchParams);
    if (key) next.set("sort", key);
    else next.delete("sort");
    setSearchParams(next, { replace: true });
  };

  const totalViews = videos.reduce((sum, v) => sum + (v.views || 0), 0);
  const totalLikes = videos.reduce((sum, v) => sum + (v.likes || 0), 0);

  return (
    <div className="pb-14">
      <section className="relative overflow-hidden rounded-3xl border border-white/6 bg-void-900/50 px-6 py-10 mt-6 sm:px-10 sm:py-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-plasma-500/25 blur-[90px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-10 h-64 w-64 rounded-full bg-ion-500/20 blur-[90px]"
        />

        <div className="relative max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-plasma-400/30 bg-plasma-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-plasma-300 uppercase">
            <span className="h-1.5 w-1.5 rounded-full bg-ember-400 animate-pulse-soft" />
            Live library
          </span>
          <h1 className="mt-4 font-display text-3xl leading-tight font-bold text-white sm:text-5xl">
            Watch what the <span className="text-grad">community</span> is streaming
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-mist-400 sm:text-base">
            Dive into fresh uploads, trending edits and creator stories — all in
            one dark, distraction-free feed.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { label: "videos", value: videos.length },
              { label: "views", value: totalViews },
              { label: "likes", value: totalLikes },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-2.5 backdrop-blur-md"
              >
                <p className="font-display text-lg font-bold text-white">
                  {s.value}
                </p>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-mist-500 uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {sortTabs.map(({ key, label, icon: Icon }) => {
            const active = sort === key;
            return (
              <button
                key={key}
                onClick={() => setSort(key)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  active
                    ? "border-transparent bg-grad text-white shadow-[0_10px_26px_-12px_rgba(124,92,255,0.9)]"
                    : "border-white/8 bg-void-850/70 text-mist-400 hover:border-white/16 hover:text-white"
                }`}
              >
                <Icon size={13} />
                {label}
              </button>
            );
          })}
        </div>

        {query && (
          <p className="text-sm text-mist-500">
            Results for <span className="text-ion-300">“{query}”</span> ·{" "}
            <span className="text-mist-300">{visible.length}</span>
          </p>
        )}
      </div>

      <section className="mt-6">
        {pending ? (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <VideoCardSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-ember-500/15 text-ember-400">
              <SearchX size={26} />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-white">
                Feed unavailable
              </h2>
              <p className="mt-1 text-sm text-mist-500">{error}</p>
            </div>
            <button onClick={fetchAllVideos} className="btn-primary">
              <RotateCcw size={16} /> Try again
            </button>
          </div>
        ) : visible.length === 0 ? (
          <div className="glass flex flex-col items-center gap-4 rounded-3xl px-6 py-16 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-plasma-500/15 text-plasma-300">
              <SearchX size={26} />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-white">
                {query ? "No matching videos" : "No videos yet"}
              </h2>
              <p className="mt-1 max-w-sm text-sm text-mist-500">
                {query
                  ? "Try a different keyword or clear the search to browse everything."
                  : "Be the first to publish — head to the studio and upload something great."}
              </p>
            </div>
            {query ? (
              <button
                onClick={() => {
                  const next = new URLSearchParams(searchParams);
                  next.delete("q");
                  setSearchParams(next, { replace: true });
                }}
                className="btn-ghost"
              >
                Clear search
              </button>
            ) : (
              <a href="/upload" className="btn-primary">
                Upload a video
              </a>
            )}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {visible.map((video, i) => (
              <VideoCard key={video._id} video={video} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AllVideos;
