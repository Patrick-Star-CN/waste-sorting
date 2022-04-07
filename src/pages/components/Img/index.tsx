import { Image, SpinLoading } from 'antd-mobile';
import './index.css';

export default function Img(props: any) {
  let img = require('@/img/sprite/combine.svg');
  return (
    <svg className="sprite">
      <use
        xlinkHref={img + '#' + String(props.num) + '_' + String(props.pos)}
      ></use>
    </svg>
  );
}
