const loadFontFromURL = async (url: string): Promise<string> => {
  const response = await fetch(url);
  const fontArrayBuffer = await response.arrayBuffer();

  return btoa(String.fromCharCode(...new Uint8Array(fontArrayBuffer)));
};

export default loadFontFromURL;

// // URL에 저장된 폰트 파일 경로
// const fontURL = "https://example.com/fonts/NotoSansKR-Regular.ttf";
// loadFontFromURL(fontURL);