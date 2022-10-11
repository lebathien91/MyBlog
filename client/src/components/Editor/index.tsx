import { useState, useRef, useEffect, useContext } from "react";

import { defaultConfig } from "./config";

const Editor = ({ body, setBody }: { body: string; setBody: Function }) => {
  const editorRef = useRef<any>();
  const [editorLoader, setEdiorLoaded] = useState(false);

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      Editor: require("./CkEditor.js"),
    };

    setEdiorLoaded(true);
  }, []);

  const { CKEditor, Editor } = editorRef.current || {};

  const uploadAdapter = (loader: any) => {
    return {
      upload: async () => {
        try {
          const file = await loader.file;

          console.log(file);
        } catch (error: any) {
          console.log({ error: error.message });
        }
      },
    };
  };

  const uploadPlugin = (editor: any) => {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      loader: any
    ) => {
      return uploadAdapter(loader);
    };
  };

  return (
    <div className="mt-3">
      {editorLoader ? (
        <CKEditor
          config={{
            ...defaultConfig,
            extraPlugins: [uploadPlugin],
          }}
          editor={Editor}
          data={body}
          onChange={(event: HTMLElement, editor: any) => {
            const data = editor.getData();
            setBody(data);
          }}
        />
      ) : (
        <div>Editor Loadding... </div>
      )}
    </div>
  );
};

export default Editor;
