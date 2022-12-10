import React from 'react';

export function PreviewPanel({ previewUrl }) {
  // Note : side effect for preview button, layout, and doctitle class
  return (
    <div className="preview-panel">
      <div className="header">
        <button
          type="button"
          className="btn btn-light btn-close"
          aria-label="Close"
          onClick={() =>
            document.getElementById('doctitle').classList.remove('preview')
          }
        >
          ╳
        </button>
        <h3 className="title">Preview</h3>
        <button
          type="button"
          className="btn btn-light btn-refresh"
          aria-label="Refresh"
          onClick={() => {
            var iframe = document.getElementById('preview-iframe');
            iframe.src = iframe.src;
          }}
        >
          ⭯
        </button>
      </div>
      <iframe id="preview-iframe" src={previewUrl} className="preview-page" />
    </div>
  );
}

export function PreviewButton({}) {
  return (
    <button
      className="btn btn-active btn-view btn-fat"
      onClick={() =>
        document.getElementById('doctitle').classList.add('preview')
      }
    >
      Side Preview
    </button>
  );
}
