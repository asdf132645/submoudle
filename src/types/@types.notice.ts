export type NoticeContent = {
  id: number;
  title: string;
  content: string;
  createAt: string;
};

export type NoticePageProps = {
  notices: NoticeContent[];
};
