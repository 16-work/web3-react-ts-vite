import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './styles.scss';

/** Props */
interface Props {
  value: string;
  onChange: (value: string) => void;

  className?: string;
}

/** Component */
export const Editor = (props: Props) => {
  /** Retrieval */

  /** Params */

  /** Actions */

  /** Template */
  return <ReactQuill theme="snow" value={props.value} onChange={props.onChange} className={props.className} />;
};
