function MyUploadAdapter(loader) {
  let reader;

  return {
    upload: async () => {
      reader = new FileReader();
      const file = await loader.file;

      const result = await new Promise((resolve, reject) => {
        reader.addEventListener('load', () => {
          resolve({ default: reader.result });
        });

        reader.addEventListener('error', (err) => {
          reject(err);
        });

        reader.addEventListener('abort', () => {
          reject();
        });

        reader.readAsDataURL(file);
      });

      return result;
    },
    abort: () => {
      reader.abort();
    }
  };
}

function MyAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}

export default MyAdapterPlugin;
