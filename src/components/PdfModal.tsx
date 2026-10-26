import React from 'react';
import { X, ExternalLink, BookOpen, Download } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  pageNumber?: number;
  topicTitle?: string;
}

export const PdfModal: React.FC<PdfModalProps> = ({
  isOpen,
  onClose,
  pageNumber = 1,
  topicTitle
}) => {
  if (!isOpen) return null;

  const pdfUrl = `/assets/aistudio/NG_-PH_P-TI_NG-ANH_-_L__C_NG___C_4320e91a.pdf#page=${pageNumber}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sách Gốc: Ngữ Pháp Tiếng Anh - Lê Công Đức
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {topicTitle ? `Đang mở bài: ${topicTitle} (Trang ${pageNumber})` : `Trang ${pageNumber}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/assets/aistudio/NG_-PH_P-TI_NG-ANH_-_L__C_NG___C_4320e91a.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              title="Mở toàn màn hình tab mới"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Đóng cửa sổ tài liệu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded PDF Viewer */}
        <div className="flex-1 w-full bg-slate-100 dark:bg-slate-950 relative">
          <iframe
            src={pdfUrl}
            className="w-full h-full border-0"
            title="Sách Ngữ Pháp Tiếng Anh Lê Công Đức PDF"
          />
        </div>

        {/* Footer info */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-xs text-slate-500">
          <span>Tài liệu tham khảo đối chiếu từ giáo trình nguyên bản</span>
          <span>Trang {pageNumber} / 196</span>
        </div>
      </div>
    </div>
  );
};
