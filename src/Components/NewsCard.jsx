export default function NewsCard({ article }) {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition">
      {article.image && <img src={article.image} alt={article.title} className="h-48 w-full object-cover" />}
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">{article.title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
          {article.description ? article.description.slice(0, 120) + "..." : "No description available."}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 dark:text-blue-400 font-semibold"
        >
          Read More →
        </a>
      </div>
    </div>
  );
}
