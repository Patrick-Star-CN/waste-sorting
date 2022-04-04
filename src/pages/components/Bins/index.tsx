import { Card, Button, Space, Popover } from 'antd-mobile';
import './index.css';
import { useState, useContext, createContext } from 'react';
import { DataContext } from '@/pages';
import { WasteType } from '@/pages';

const TotalContext = createContext(0);
const binInfo = [
  {
    name: '可回收垃圾',
    type: 1,
    info: (
      <>
        常见的可回收垃圾有：
        <ul>
          <li>碎玻璃</li>
          <li>旧衣物</li>
          <li>废纸</li>
          <li>金属制品</li>
          <li>充电宝</li>
        </ul>
      </>
    ),
  },
  {
    name: '餐余垃圾',
    type: 2,
    info: (
      <>
        常见的残余垃圾有：
        <ul>
          <li>剩菜剩饭</li>
          <li>果皮</li>
          <li>蛋壳</li>
          <li>骨头</li>
          <li>落叶</li>
        </ul>
      </>
    ),
  },
  {
    name: '其他垃圾',
    type: 3,
    info: (
      <>
        常见的其他垃圾有：
        <ul>
          <li>一次性餐具</li>
          <li>卫生纸</li>
          <li>尿片</li>
          <li>污损塑料袋子</li>
          <li>烟蒂</li>
          <li>碎花盆</li>
          <li>碎碗碟</li>
        </ul>
      </>
    ),
  },
  {
    name: '有害垃圾',
    type: 4,
    info: (
      <>
        常见的有害垃圾有：
        <ul>
          <li>干电池</li>
          <li>过期药物</li>
          <li>废灯泡</li>
          <li>水银温度计</li>
        </ul>
      </>
    ),
  },
];

function Bin(props: any) {
  const dataContext = useContext(DataContext);
  let total = useContext(TotalContext);

  function judge() {
    let { toggleWasteList, toggleCurSelect } = dataContext;
    if (dataContext.curSelect === 0) {
      alert('你没有选择呢');
      return;
    }
    if (
      props.type !=
      WasteType[dataContext.wasteList[dataContext.curSelect - 1].type - 1].type
    )
      console.log(binInfo[props.type - 1].info);
    else {
      console.log(
        '你成功回收了',
        binInfo[props.type - 1].name,
        WasteType[dataContext.wasteList[dataContext.curSelect - 1].type - 1]
          .name,
      );
      toggleCurSelect(0);
      toggleWasteList(dataContext.curSelect - 1, -2);
      if (--total === 0) dataContext.toggleStep();
    }
  }

  return (
    <Popover
      content={props.info}
      trigger="click"
      placement="bottomLeft"
      visible={dataContext.curSelect ? undefined : false}
    >
      <div className="bin" onClick={judge}>
        <img></img>
        {binInfo[props.type - 1].name}
      </div>
    </Popover>
  );
}

export default function Bins(props: any) {
  const dataContext = useContext(DataContext);
  let total = dataContext.wasteList.filter((item) => item.used >= 0).length;

  return (
    <Card>
      <Space style={{ padding: '.2rem 0' }}>
        <h2>垃圾分类</h2>
      </Space>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TotalContext.Provider value={total}>
          <div className="bins">
            {binInfo.map((item) => (
              <Bin key={item.type} type={item.type} info={item.info} />
            ))}
          </div>
        </TotalContext.Provider>
      </div>
    </Card>
  );
}
