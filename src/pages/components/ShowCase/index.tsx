import './index.css';
import { Card, Space, Tag } from 'antd-mobile';
import { DataContext } from '@/pages';
import { useContext, useEffect } from 'react';
import { WasteType } from '@/pages';
import { totalAll } from '@/pages';

export default function ShowCase(props: any) {
  const dataContext = useContext(DataContext);
  let wasteList = dataContext.wasteList;
  const totalToRecycle = wasteList.filter((item) => item.used === -2).length;

  return (
    <Card>
      <Space align="center" style={{ padding: '.2rem 0' }}>
        <h2>待{dataContext.step === 1 ? '选择' : '回收'}垃圾</h2>
        {dataContext.score ? <Tag>🚚运输 {dataContext.score} 次</Tag> : null}
        {totalToRecycle ? (
          <Tag color="success">
            ♻️已回收 {totalToRecycle} / {totalAll}
          </Tag>
        ) : null}
      </Space>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="showcase">
          {wasteList.map((item, index) => {
            if (
              (dataContext.step === 1 && item.used === -1) ||
              (dataContext.step === 2 && item.used >= 0)
            )
              return (
                <div
                  className={
                    dataContext.curSelect === item.id
                      ? 'waste-item selected'
                      : 'waste-item'
                  }
                  key={index}
                  onClick={() => dataContext.toggleCurSelect(item.id)}
                >
                  #{item.id}
                  <br />
                  {WasteType[item.type - 1].name}
                  <br />
                  width:{WasteType[item.type - 1].width}
                  <br />
                  height:{WasteType[item.type - 1].height}
                </div>
              );
          })}
          <div className="waste-item">没有垃圾了</div>
        </div>
      </div>
    </Card>
  );
}
