import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faIndustry, faGamepad, faChartLine } from '@fortawesome/free-solid-svg-icons';

const NEWS_CATEGORIES = {
  studio: { icon: faGamepad, color: 'text-blue-500' },
  industry: { icon: faIndustry, color: 'text-green-500' },
  market: { icon: faChartLine, color: 'text-purple-500' }
};

const NewsComponent = ({ news, onDismissNews }) => {
  if (!news || news.length === 0) return null;

  return (
    <div className="news-container bg-gray-100 p-4 rounded-lg shadow-md max-h-64 overflow-y-auto">
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <FontAwesomeIcon icon={faNewspaper} className="mr-2 text-gray-700" />
        News & Stories
      </h3>
      {news.map((item, index) => {
        const categoryInfo = NEWS_CATEGORIES[item.category] || NEWS_CATEGORIES.studio;

        return (
          <div
            key={index}
            className={`news-item mb-3 p-3 rounded-md bg-white shadow-sm relative ${categoryInfo.color}`}
          >
            <div className="flex items-center mb-2">
              <FontAwesomeIcon
                icon={categoryInfo.icon}
                className={`mr-2 ${categoryInfo.color}`}
              />
              <h4 className="font-semibold text-gray-800">{item.title}</h4>
            </div>
            <p className="text-gray-600 text-sm">{item.description}</p>
            <button
              onClick={() => onDismissNews(item.id)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default NewsComponent;