import { Image, SpinLoading } from 'antd-mobile';
import './index.css';

function Sprite(props: any) {
  const img = require('@/img/sprite_combine.svg');
  return (
    <svg className="sprite">
      <use
        xlinkHref={img + '#' + String(props.num) + '_' + String(props.pos)}
      ></use>
    </svg>
  );
}
function ToSelect(props: any) {
  const img = require('@/img/combine.svg');
  return (
    <svg className="to-select">
      <use xlinkHref={img + '#' + String(props.num)}></use>
    </svg>
  );
}
function Bin(props: any) {
  const img = require('@/img/combine.svg');
  return (
    <svg className="sprite">
      <use xlinkHref={img + '#bin' + String(props.num)}></use>
    </svg>
  );
}
function BorderNet(props: any) {
  const img = require('@/img/combine.svg');
  return (
    <svg className="sprite">
      <use xlinkHref={img + '#border_white_20'}></use>
    </svg>
  );
}
export default function Img(props: any) {
  if (props.type === 1)
    return <Sprite num={props.num} pos={props.pos}></Sprite>;
  else if (props.type === 2) return <ToSelect num={props.num}></ToSelect>;
  else if (props.type === 3) {
    return <Bin num={props.num}></Bin>;
  } else if (props.type === 4) return <BorderNet></BorderNet>;
  else return null;
}
