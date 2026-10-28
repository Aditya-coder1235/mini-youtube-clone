import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import {
  ThumbsUp,
  Loader2,
  Send,
  MessageCircle,
  Eye,
  ArrowLeft,
  Clapperboard,
} from "lucide-react";
import { useToast } from "./Toast";
import { API, formatCount, mediaUrl, seedHue, timeAgo } from "../utils";

const VideoById = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [video, setVideo] = useState(null);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [text, setText] = useState("");
  const [likesCount, setLikesCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [liking, setLiking] = useState(false);

  const fetchVideoById = useCallback(async () => {
    setPending(true);
    setError(null);
    try {
      const res = await axios.get(`${API}/api/video/getById/${id}`, {
        withCredentials: true,
      });
      setVideo(res.data.video);
      setLikesCount(res.data.video?.likes || 0);
    } catch (err) {
      console.error(err);
      setError("This video could not be loaded.");
    } finally {
      setPending(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVideoById();
    window.scrollTo({ top: 0 });
  }, [fetchVideoById]);

  async function addComment(e) {
    e.preventDefault();
    if (!text.trim()) return;
    setSending(true);
    try {
      const res = await axios.post(
        `${API}/api/comment/create/${id}`,
        { text: text.trim() },
        { withCredentials: true }
      );
      const created = res.data.comment;
      setVideo((v) => ({ ...v, comments: [...(v.comments || []), created] }));
      setText("");
      toast.success("Comment posted");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Sign in to join the conversation."
      );
    } finally {
      setSending(false);
    }
  }

  const handleLike = async () => {
    if (liking) return;
    setLiking(true);
    setLikesCount((c) => c + 1);
    try {
      const res = await axios.put(`${API}/api/video/like/${id}`, {}, {
        withCredentials: true,
      });
      setLikesCount(res.data.likesCount);
    } catch (error) {
      setLikesCount((c) => c - 1);
      console.error("Error liking video:", error);
      toast.error("Couldn't like this video.");
    } finally {
      setLiking(false);
    }
  };

  if (pending) {
    return (
      <div className="mx-auto w-full max-w-6xl py-8">
        <div className="aspect-video w-full animate-pulse-soft rounded-3xl bg-void-800" />
        <div className="mt-6 h-7 w-2/3 animate-pulse-soft rounded-full bg-void-800" />
        <div className="mt-3 h-4 w-1/3 animate-pulse-soft rounded-full bg-void-800" />
        <div className="mt-8 h-40 animate-pulse-soft rounded-3xl bg-void-850" />
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="mx-auto w-full max-w-xl py-20 text-center">
        <div className="glass rounded-3xl px-6 py-14">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-ember-500/15 text-ember-400">
            <Clapperboard size={26} />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold text-white">
            Video unavailable
          </h1>
          <p className="mt-2 text-sm text-mist-500">
            {error || "The video you're looking for doesn't exist."}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button onClick={fetchVideoById} className="btn-ghost">
              Retry
            </button>
            <Link to="/" className="btn-primary">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const comments = video.comments || [];

  return (
    <div className="mx-auto w-full max-w-6xl py-6 sm:py-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-mist-400 transition hover:text-white"
      >
        <ArrowLeft size={16} /> Back
      </button>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-3xl border border-white/8 bg-void-900/70 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]">
            <div className="relative bg-black">
              <video
                src={mediaUrl(video.videoUrl)}
                poster={mediaUrl(video.thumbnailUrl)}
                controls
                playsInline
                className="aspect-video w-full bg-black"
              />
            </div>

            <div className="p-5 sm:p-6">
              <h1 className="font-display text-xl leading-snug font-bold text-white sm:text-2xl">
                {video.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-mist-500">
                {video.views > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Eye size={13} /> {formatCount(video.views)} views
                  </span>
                )}
                <span className="flex items-center gap-1.5">
                  <MessageCircle size={13} /> {comments.length} comments
                </span>
                {video.createdAt && <span>{timeAgo(video.createdAt)}</span>}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleLike}
                  disabled={liking}
                  className={`group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    liking
                      ? "border-plasma-400/60 bg-plasma-500/20 text-plasma-200"
                      : "border-white/10 bg-void-800 text-mist-200 hover:border-plasma-400/50 hover:text-white"
                  }`}
                >
                  <ThumbsUp
                    size={16}
                    className="fill-plasma-400 text-plasma-400 transition-transform group-hover:scale-110"
                  />
                  {formatCount(likesCount)}
                </button>

                <div className="ml-auto flex items-center gap-2.5 rounded-full border border-white/8 bg-void-850/70 py-1.5 pr-4 pl-1.5">
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full font-display text-xs font-bold text-void-950"
                    style={{
                      background: `linear-gradient(135deg, hsl(${seedHue(
                        video.title
                      )} 80% 70%), hsl(${(seedHue(video.title) + 60) % 360} 80% 58%))`,
                    }}
                  >
                    {(video.title || "V")[0].toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-mist-300">
                    Creator
                  </span>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-void-850/70 p-4">
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-mist-300">
                  {video.description || "No description provided."}
                </p>
              </div>
            </div>
          </div>

          <section className="rounded-3xl border border-white/8 bg-void-900/60 p-5 sm:p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <MessageCircle size={18} className="text-plasma-300" />
              Comments
              <span className="rounded-full bg-void-700 px-2 py-0.5 text-xs font-bold text-mist-300">
                {comments.length}
              </span>
            </h2>

            <form onSubmit={addComment} className="mt-4 flex gap-3">
              <input
                type="text"
                placeholder="Add a comment…"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="input-field h-11 flex-1 rounded-full"
                aria-label="Add a comment"
              />
              <button
                type="submit"
                disabled={sending || !text.trim()}
                aria-label="Post comment"
                className="btn-primary h-11 w-11 !px-0 disabled:opacity-50"
              >
                {sending ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
              </button>
            </form>

            <div className="mt-5 space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, i) => (
                  <div
                    key={comment._id || i}
                    className="animate-rise flex gap-3"
                    style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-display text-xs font-bold text-void-950"
                      style={{
                        background: `linear-gradient(135deg, hsl(${
                          (seedHue(String(comment._id || i)) + 40) % 360
                        } 80% 70%), hsl(${seedHue(String(comment._id || i))} 80% 58%))`,
                      }}
                    >
                      <span aria-hidden="true">U</span>
                    </span>
                    <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm bg-void-850/70 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-semibold text-mist-200">
                          Viewer
                        </p>
                        <span className="text-[11px] text-mist-500">
                          {comment.createdAt
                            ? timeAgo(comment.createdAt)
                            : "just now"}
                        </span>
                      </div>
                      <p className="mt-1 break-words text-sm leading-relaxed text-mist-300">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center">
                  <p className="text-sm font-medium text-mist-300">
                    No comments yet
                  </p>
                  <p className="mt-1 text-xs text-mist-500">
                    Be the first to say something nice.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <p className="px-1 text-[10px] font-bold tracking-[0.18em] text-mist-500 uppercase">
              Up next
            </p>
            <div className="glass rounded-2xl p-4">
              <p className="text-sm leading-relaxed text-mist-400">
                More community uploads are waiting on the home feed.
              </p>
              <Link to="/" className="btn-primary mt-4 w-full text-sm">
                Browse feed
              </Link>
            </div>
            <div className="glass rounded-2xl p-4">
              <p className="text-sm leading-relaxed text-mist-400">
                Got something to share? Drop it in the studio.
              </p>
              <Link to="/upload" className="btn-ghost mt-4 w-full text-sm">
                Upload video
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default VideoById;
