import { CheckBox } from '@/index';

export const CheckBoxPage = ({
  type,
  name,
}: {
  type: 'RADIO' | 'CHECK' | 'GRAY';
  name?: string;
}) => {
  return (
    <div className='contents'>
      <ul>
        <li>
          <CheckBox type={type} name={name} />
        </li>
        <li>
          <CheckBox type={type} name={name} />
        </li>
        <li>
          <CheckBox type={type} name={name} />
        </li>
      </ul>
    </div>
  );
};
