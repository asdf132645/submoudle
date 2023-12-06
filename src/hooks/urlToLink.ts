// 링크를 감지하여 a 태그로 감싸기
export const urlToLink = (content: string) => {
  const urlRegex = /(http?:\/\/[^\s]+)/g;
  const convertContent = content.replace(
    urlRegex,
    (url) => `<a href="${url}" target="_blank">${url}</a>`
  );
  return {
    __html: convertContent
      .split('\n')
      .reduce((sum: string, text) => `${sum}<p>${text}</p>`, ''),
  };
};
