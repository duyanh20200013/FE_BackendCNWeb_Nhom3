import { memo } from 'react';
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToMarkdown from 'draftjs-to-markdown';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

function DescriptionMarkdown({ htmlContent, onChangeHtml, onChangeMarkdown }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const convertDraftContent = content => {
    const markdown = draftToMarkdown(convertToRaw(content));
    const html = draftToHtml(convertToRaw(content));
    return { markdown, html };
  };

  useEffect(() => {
    console.log(editorState);
    const contentState = editorState.getCurrentContent();
    const { markdown, html } = convertDraftContent(contentState);
    console.log('Markdown:', markdown);
    console.log('HTML:', html);
    onChangeMarkdown(markdown);
    onChangeHtml(html);
  }, [editorState]);

  useEffect(() => {
    if (!htmlContent) {
      return;
    }
    console.log('html: ', htmlContent);
    const blocksFromHtml = htmlToDraft(htmlContent);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    setEditorState(EditorState.createWithContent(contentState));
  }, [htmlContent]);

  return (
    <div className="prose">
      <Editor
        wrapperClassName="border border-gray-300 rounded"
        editorClassName="p-4 text-base min-h-[280px]"
        toolbarClassName="border-b border-l-0 border-r-0 border-gray-300 p-2 w-full"
        // toolbarClassName="sticky top-0 z-50 text-base"
        editorState={editorState}
        onEditorStateChange={setEditorState}
      />
    </div>
  );
}

export default memo(DescriptionMarkdown);
