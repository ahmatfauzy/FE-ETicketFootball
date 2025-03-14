import React, { useState } from 'react';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
  onToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, isOpen = false, onToggle }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-xl shadow-sm bg-gray-900 border border-gray-700 transition-all duration-200 hover:shadow-md">
      <button
        className="w-full flex justify-between items-center py-5 px-8 text-left font-medium focus:outline-none bg-gray-900"
        onClick={onToggle}
      >
        <span className="text-lg text-white font-semibold">{title}</span>
        <div className={`transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-180' : ''}`}>
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 pb-6 pt-2 text-gray-300">{children}</div>
      </div>
    </div>
  );
};

interface AccordionProps {
  items: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
  allowMultiple?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ items, allowMultiple = false }) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenItems((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenItems((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item) => (
          <AccordionItem
            key={item.id}
            title={item.title}
            isOpen={openItems.includes(item.id)}
            onToggle={() => handleToggle(item.id)}
          >
            {item.content}
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Accordion;