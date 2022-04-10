import { Popup, Tag } from 'antd-mobile';

function GuideContent() {
  return (
    <div style={{ padding: '3vh' }}>
      <h2>📖指引</h2>
      <p>
        欢迎使用<strong>不聪明的垃圾桶</strong>
      </p>

      <h3>介绍</h3>
      <li>
        各种垃圾都有不同的大小形状，志愿者要根据其属性合理地将垃圾填充到到
        <strong>临时垃圾桶里</strong>
      </li>
      <li>
        你认为桶不能再装载垃圾后，就需要把垃圾运输到远处的垃圾站，并按照正确的分类投放到站内相应的
        <strong>大垃圾桶</strong>
      </li>
      <li>
        准确地分类临时垃圾桶所有的垃圾后，记完成一次<strong>运输</strong>
        ，将待处理垃圾全部处理完，游戏胜利
      </li>
      <h3>玩法</h3>
      <ol>
        <li>待选择垃圾栏内选择一个垃圾</li>
        <li>再点击垃圾箱网格的某一列放置</li>
        <li>垃圾分类时操作相同</li>
      </ol>
      <h3>提示</h3>
      <li>运输垃圾按钮🚚在右上角</li>
      <li>运输次数越少越好，每次运输前尽量填满垃圾桶吧</li>
      <li>在分类垃圾的时候分类错误显示相应提示</li>
      <li>
        待选择垃圾中的数字提示表示 <Tag fill="outline">高 × 宽</Tag>
      </li>
    </div>
  );
}
export default function Guide(props: any) {
  return (
    <Popup
      visible={props.visible}
      onMaskClick={() => {
        props.togglePromptVisible(false);
      }}
      bodyStyle={{
        borderTopLeftRadius: '20px',
        borderTopRightRadius: '20px',
        minHeight: '15rem',
      }}
    >
      <GuideContent></GuideContent>
    </Popup>
  );
}
