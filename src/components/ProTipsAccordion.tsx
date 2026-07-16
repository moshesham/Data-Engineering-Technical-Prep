import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface ProTipsAccordionProps {
  tips: string[];
}

export function ProTipsAccordion({ tips }: ProTipsAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 border border-emerald-200 bg-emerald-50 rounded-xl overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between bg-emerald-50 hover:bg-emerald-100/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Lightbulb size={20} className="text-emerald-600" />
          <span className="font-bold text-emerald-900">Domain Pro Tips</span>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-emerald-700" />
        ) : (
          <ChevronDown size={20} className="text-emerald-700" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-5 pb-5 pt-1 border-t border-emerald-200/50">
          <ul className="space-y-3 mt-3">
            {tips.map((tip, index) => (
              <li key={index} className="flex items-start gap-3 text-emerald-800">
                <div className="min-w-6 h-6 rounded-full bg-emerald-200 flex items-center justify-center text-xs font-bold text-emerald-700 mt-0.5">
                  {index + 1}
                </div>
                <p className="leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
