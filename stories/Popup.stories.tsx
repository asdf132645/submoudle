import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddrSearch } from '@/addr/AddrSearch';
import { FileUpload } from '@/file/FileUpload';
import { FirmSearch } from '@/firm/FirmSearch';
import { Popup } from '@/popup/Popup';
import { TextArea } from '@/index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/Popup',
  component: Popup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Popup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />;

export const AlertPopup = Template.bind({});
AlertPopup.args = {
  children: (
    <p style={{ textAlign: 'center', marginTop: '1rem' }}>
      SNS로그인으로
      <br />
      비밀번호를 초기화 할 수 없습니다.
    </p>
  ),
  btnProp: [
    {
      label: '확인',
      types: 'solid',
      style: 'ter',
      size: 'lg',
    },
  ],
};

export const ConfirmPopup = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ConfirmPopup.args = {
  children: (
    <p style={{ textAlign: 'center', marginTop: '1rem' }}>
      SNS로그인으로
      <br />
      비밀번호를 초기화 할 수 없습니다.
    </p>
  ),
  btnProp: [
    {
      label: '확인',
      types: 'solid',
      style: 'ter',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
    {
      label: '취소',
      types: 'outline',
      style: 'sec',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
  ],
};

export const RejectPopup = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
RejectPopup.args = {
  label: '반려사유',
  children: <TextArea rows={7} />,
  btnProp: [
    {
      label: '적용',
      types: 'solid',
      style: 'ter',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
    {
      label: '취소',
      types: 'outline',
      style: 'sec',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
  ],
};

export const FirmSearchPopup = Template.bind({});
FirmSearchPopup.args = {
  label: '기업검색',
  children: <FirmSearch />,
  btnProp: [
    {
      label: '적용',
      types: 'solid',
      style: 'ter',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
    {
      label: '취소',
      types: 'outline',
      style: 'sec',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
  ],
};

export const AddrSearchPopup = Template.bind({});
AddrSearchPopup.args = {
  label: '주소검색',
  children: <AddrSearch />,
  btnProp: [
    {
      label: '적용',
      types: 'solid',
      style: 'ter',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
    {
      label: '취소',
      types: 'outline',
      style: 'sec',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
  ],
};

export const FileUploadPopup = Template.bind({});
FileUploadPopup.args = {
  label: '파일첨부',
  children: <FileUpload />,
  btnProp: [
    {
      label: '적용',
      types: 'solid',
      style: 'ter',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
    {
      label: '취소',
      types: 'outline',
      style: 'sec',
      size: 'lg',
      margin: '0 1rem 0 0',
    },
  ],
};
