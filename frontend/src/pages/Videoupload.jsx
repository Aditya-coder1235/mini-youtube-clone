import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  Film,
  ImagePlus,
  Loader2,
  Rocket,
  FileVideo,
  CheckCircle2,
} from "lucide-react";
import { useToast } from "../components/Toast";
import { API } from "../utils";

const DropZone = ({
  accept,
  label,
  hint,
  icon: Icon,
  file,
  onFile,
  required = true,
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const pick = (list) => {
    const picked = list?.[0];
    if (picked) onFile(picked);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        pick(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed px-4 py-7 text-center transition-all duration-200 ${
        dragging
          ? "border-plasma-400 bg-plasma-500/12 scale-[1.01]"
          : file
            ? "border-ion-400/50 bg-ion-500/8"
            : "border-white/12 bg-void-850/60 hover:border-plasma-400/60 hover:bg-void-800/70"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        required={required && !file}
        onChange={(e) => pick(e.target.files)}
      />

      <span
        className={`grid h-11 w-11 place-items-center rounded-xl transition ${
          file
            ? "bg-ion-500/20 text-ion-300"
            : "bg-plasma-500/15 text-plasma-300"
        }`}
      >
        {file ? <CheckCircle2 size={20} /> : <Icon size={20} />}
      </span>

      <p className="text-sm font-semibold text-mist-100">
        {file ? file.name : label}
      </p>
      <p className="max-w-[16rem] text-xs text-mist-500">
        {file
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB — click to replace`
          : hint}
      </p>
    </div>
  );
};

const Videoupload = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function uploadVideo() {
    setBusy(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("video", video);

      await axios.post(`${API}/api/video/create`, formData, {
        withCredentials: true,
      });

      setDone(true);
      toast.success("Video published to your channel!");
      setTitle("");
      setDescription("");
      setImage(null);
      setVideo(null);
      setTimeout(() => {
        setDone(false);
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Upload failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadVideo();
  };

  const steps = [
    { n: 1, label: "Details", active: true },
    { n: 2, label: "Files", active: Boolean(title && description) },
    { n: 3, label: "Publish", active: Boolean(video && image) },
  ];

  return (
    <div className="mx-auto max-w-3xl py-10">
      <div className="relative overflow-hidden rounded-3xl border border-white/6 bg-void-900/50 px-6 py-8 sm:px-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-plasma-500/22 blur-[85px]"
        />

        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border border-plasma-400/30 bg-plasma-500/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-plasma-300 uppercase">
            <Rocket size={12} /> Studio
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
            Upload a new <span className="text-grad">video</span>
          </h1>
          <p className="mt-2 text-sm text-mist-400">
            Add your files, write a catchy title and hit publish — it only takes
            a moment.
          </p>

          <div className="mt-6 flex items-center gap-2">
            {steps.map((s, i) => (
              <div key={s.n} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold transition ${
                    s.active
                      ? "bg-grad text-void-950"
                      : "bg-void-700 text-mist-500"
                  }`}
                >
                  {s.n}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    s.active ? "text-mist-100" : "text-mist-500"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && (
                  <span
                    className={`h-px flex-1 rounded-full ${
                      s.active ? "bg-plasma-500/50" : "bg-white/8"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="glass mt-6 rounded-3xl p-6 space-y-6 sm:p-8"
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1.5 block text-xs font-semibold tracking-wide text-mist-400 uppercase"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Add a title that describes your video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input-field"
            maxLength={90}
            required
          />
          <p className="mt-1.5 text-right text-[11px] text-mist-500">
            {title.length}/90
          </p>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1.5 block text-xs font-semibold tracking-wide text-mist-400 uppercase"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Tell viewers about your video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input-field resize-y"
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-mist-400 uppercase">
              Thumbnail
            </p>
            <DropZone
              accept="image/*"
              icon={ImagePlus}
              label="Drop thumbnail or browse"
              hint="JPG or PNG · 16:9 works best"
              file={image}
              onFile={setImage}
            />
          </div>

          <div>
            <p className="mb-1.5 text-xs font-semibold tracking-wide text-mist-400 uppercase">
              Video file
            </p>
            <DropZone
              accept="video/*"
              icon={FileVideo}
              label="Drop video or browse"
              hint="MP4, WebM or MOV · up to your server limit"
              file={video}
              onFile={setVideo}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/6 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-mist-500">
            <Film size={14} className="text-plasma-300" />
            Publishing as{" "}
            <span className="text-mist-300">
              {localStorage.getItem("name") || "Creator"}
            </span>
          </p>
          <button
            type="submit"
            disabled={busy || done}
            className="btn-primary h-12 px-7 disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Publishing…
              </>
            ) : done ? (
              <>
                <CheckCircle2 size={16} /> Published
              </>
            ) : (
              <>
                <Rocket size={16} /> Publish video
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Videoupload;
