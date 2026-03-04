
import React, { useState, useRef } from 'react';
import { UploadIcon, FileIcon, XIcon, AlertTriangleIcon } from 'lucide-react';

export function FileUpload({
  files,
  onFilesChange,
  label,
  note,
  accept = '.pdf,.doc,.docx,.jpg,.jpeg,.png',
  error,
  required
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles) => {
    const documentFiles = newFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }));
    onFilesChange([...files, ...documentFiles]);
  };

  const removeFile = (fileId) => {
    onFilesChange(files.filter((f) => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="w-full">
      {label &&
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      }

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
          transition-colors duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50' : error ? 'border-red-300 hover:border-red-400' : 'border-gray-200 hover:border-gray-300'}
        `}>

        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          onChange={handleFileSelect}
          className="hidden" />

        <UploadIcon
          className={`w-10 h-10 mx-auto mb-3 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />

        <p className="text-sm text-gray-600 mb-1">
          <span className="font-medium text-blue-600">Click to upload</span> or
          drag and drop
        </p>
        <p className="text-xs text-gray-400">
          PDF, DOC, DOCX, JPG, PNG up to 10MB
        </p>
      </div>

      {note &&
      <div className="flex items-start gap-2 mt-2 p-3 bg-amber-50 rounded-lg">
          <AlertTriangleIcon className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-700">{note}</p>
        </div>
      }

      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}

      {files.length > 0 &&
      <div className="mt-3 space-y-2">
          {files.map((file) =>
        <div
          key={file.id}
          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">

              <div className="flex items-center gap-3 min-w-0">
                <FileIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              removeFile(file.id);
            }}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label={`Remove ${file.name}`}>

                <XIcon className="w-4 h-4" />
              </button>
            </div>
        )}
        </div>
      }
    </div>);

}