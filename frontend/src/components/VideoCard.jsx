import { useNavigate } from "react-router";
import { Heart, Play, Eye } from "lucide-react";
import { formatCount, mediaUrl, timeAgo } from "../utils";

const VideoCard = ({ video, index = 0 }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/video/${video._id}`)}
      style={{ animationDelay: `${Math.min(index, 10) * 60}ms` }}
      className="animate-rise group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-void-850 transition-all duration-300 group-hover:border-plasma-500/40 group-hover:shadow-[0_20px_50px_-20px_rgba(124,92,255,0.45)]">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={mediaUrl(video.thumbnailUrl)}
            alt={video.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-void-950/85 via-void-950/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

          <div className="absolute inset-0 grid place-items-center opacity-0 transition-all duration-300 group-hover:opacity-100">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-grad shadow-[0_10px_30px_-6px_rgba(124,92,255,0.9)] scale-75 transition-transform duration-300 group-hover:scale-100">
              <Play size={22} className="ml-0.5 fill-void-950 text-void-950" />
            </span>
          </div>

          {video.views > 0 && (
            <span className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded-lg bg-void-950/75 px-2 py-1 text-[11px] font-medium text-mist-200 backdrop-blur-sm">
              <Eye size={12} /> {formatCount(video.views)}
            </span>
          )}
        </div>

        <div className="flex items-start gap-3 p-3.5">
          <span
            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-void-950"
            style={{
              background: `linear-gradient(135deg, hsl(${(video._id.charCodeAt(0) * 7) % 360} 80% 70%), hsl(${(video._id.charCodeAt(1) * 11) % 360} 80% 60%))`,
            }}
          >
            {(video.title || "V")[0].toUpperCase()}
          </span>

          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 font-display text-[0.95rem] leading-snug font-semibold text-mist-100 transition-colors group-hover:text-white">
              {video.title}
            </h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-mist-500">
              {video.views > 0 && <span>{formatCount(video.views)} views</span>}
              <span className="flex items-center gap-1 text-plasma-300">
                <Heart size={12} className="fill-plasma-300" />
                {formatCount(video.likes)}
              </span>
              {video.createdAt && <span>{timeAgo(video.createdAt)}</span>}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export const VideoCardSkeleton = () => (
  <div className="overflow-hidden rounded-2xl border border-white/5 bg-void-850">
    <div className="aspect-video animate-pulse-soft bg-void-700" />
    <div className="flex items-start gap-3 p-3.5">
      <div className="h-9 w-9 shrink-0 animate-pulse-soft rounded-full bg-void-700" />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 w-4/5 animate-pulse-soft rounded-full bg-void-700" />
        <div className="h-3 w-2/5 animate-pulse-soft rounded-full bg-void-700" />
      </div>
    </div>
  </div>
);

export default VideoCard;
