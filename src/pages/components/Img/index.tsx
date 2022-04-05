import { Image, SpinLoading } from 'antd-mobile';

export default function Img(props: any) {
  let img = require('@/img/sprite/' +
    String(props.num) +
    '_' +
    String(props.pos) +
    '.svg');
  return (
    <Image
      src={img}
      height="100%"
      width="100%"
      placeholder={<SpinLoading />}
      fit="contain"
    />
  );
}
