import { Image } from 'antd-mobile';

export default function Img(props: any) {
  let img = require('@/img/' +
    String(props.num) +
    '_' +
    String(props.pos) +
    '.svg');
  if (img != null)
    return <Image src={img} height="100%" width="100%" fit="contain" />;
  else return null;
}
