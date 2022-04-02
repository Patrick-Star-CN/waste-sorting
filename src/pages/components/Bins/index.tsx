import { Card, Button, Space } from 'antd-mobile';
import './index.css';
import { useState, useContext, createContext } from 'react';
import { DataContext } from '@/pages';
import { WasteType } from '@/pages';

const TotalContext = createContext(0);
const binInfo = [
  {
    name: '可回收垃圾',
    type: 1,
    info: '常见的可回收垃圾有：碎玻璃，旧衣物，废纸，金属制品，充电宝',
  },
  {
    name: '餐余垃圾',
    type: 2,
    info: '常见的残余垃圾有：剩菜剩饭，果皮，蛋壳，骨头，落叶',
  },
  {
    name: '其他垃圾',
    type: 3,
    info: '常见的其他垃圾有：一次性餐具，卫生纸，尿片，污损塑料袋子，烟蒂，碎花盆，碎碗碟',
  },
  {
    name: '有害垃圾',
    type: 4,
    info: '常见的有害垃圾有：干电池，过期药物，废灯泡，水银温度计',
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
    } // console.log(WasteType[dataContext.wasteList[dataContext.curSelect - 1].type - 1].type)
  }

  return (
    <div className="bin" onClick={judge}>
      <img></img>
      {binInfo[props.type - 1].name}
    </div>
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
              <Bin key={item.type} type={item.type} />
            ))}
          </div>
        </TotalContext.Provider>
      </div>
    </Card>
  );
}
