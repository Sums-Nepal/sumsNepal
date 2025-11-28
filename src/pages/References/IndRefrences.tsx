import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link2, Share2, Copy, ExternalLink, Youtube, ChevronLeft } from "lucide-react";
import { refrencesData } from "./RefrencesData";

const IndRefrences = () => {
  const { id } = useParams(); // Id === Title
  const navigate = useNavigate();


  const item = refrencesData.find((ref) => ref.title.toString().trim().toLowerCase() === id?.toString().trim().toLowerCase());

  if (!item) {
    return (
      <div className="p-10 text-center text-xl text-red-500">
        Reference not found
      </div>
    );
  }

  const pageUrl = window.location.href;

  const copyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    alert("Link copied!");
  };

  // 🔥 Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 mb-6"
      >
        <ChevronLeft className="w-5 h-5" />
        Back
      </button>

      {/* Title */}
      <h1 className="text-3xl font-bold text-orange-500">{item.title}</h1>
      <p className="text-gray-600 mt-1">{item.institution}</p>

      {/* Image */}
      <div className="mt-6 w-full flex justify-center">
        <img
          src={item.logo}
          alt={item.title}
          className="w-40 h-40 object-contain rounded-xl shadow-md bg-white p-3"
        />
      </div>

      {/* Description */}
      <p className="mt-6 text-gray-700 leading-relaxed">{item.description}</p>

      {/* Highlights */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-orange-500">Highlights</h2>
        <ul className="mt-2 list-disc list-inside text-gray-700 space-y-1">
          {item.highlights.map((h, index) => (
            <li key={index}>{h}</li>
          ))}
        </ul>
      </div>

      {/* Video */}
      {item.video && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-orange-500 mb-2">Video</h2>

          {/* Embedded YouTube Player */}
          <iframe
            className="rounded-xl w-full h-64 sm:h-80 shadow"
            src={`https://www.youtube.com/embed/${getYouTubeId(item.video)}`}
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* PDF */}
      {item.pdfUrl && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-orange-500">Document</h2>
          <a
            href={item.pdfUrl}
            download
            className="flex items-center gap-2 mt-2 text-orange-500 hover:text-orange-600"
          >
            <ExternalLink className="w-5 h-5" />
            Download PDF
          </a>
        </div>
      )}

      {/* Official Link */}
      {item.link && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-orange-500">Official Link</h2>
          <a
            href={item.link}
            target="_blank"
            className="flex items-center gap-2 mt-2 text-orange-500 hover:text-orange-600"
          >
            <Link2 className="w-5 h-5" />
            Visit Link
          </a>
        </div>
      )}

      {/* Share Section */}
      <div className="mt-10 p-4 bg-orange-50 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-orange-500 mb-3 flex items-center gap-2">
          <Share2 className="w-5 h-5" /> Share This Reference
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <button
            onClick={copyLink}
            className="flex items-center gap-2 p-2 rounded-lg bg-white shadow hover:bg-orange-100 transition"
          >
            <Copy className="w-4 h-4 text-orange-500" />
            Copy Link
          </button>

          <a
            href={`https://wa.me/?text=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            className="flex items-center gap-2 p-2 rounded-lg bg-white shadow hover:bg-orange-100 transition"
          >
            <Share2 className="w-4 h-4 text-green-500" />
            WhatsApp
          </a>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            className="flex items-center gap-2 p-2 rounded-lg bg-white shadow hover:bg-orange-100 transition"
          >
            <Share2 className="w-4 h-4 text-blue-600" />
            Facebook
          </a>

          <a
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}`}
            target="_blank"
            className="flex items-center gap-2 p-2 rounded-lg bg-white shadow hover:bg-orange-100 transition"
          >
            <Share2 className="w-4 h-4 text-sky-500" />
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndRefrences;
