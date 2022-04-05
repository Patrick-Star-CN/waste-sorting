import './index.css';
import { Card, Space, Tag, Empty, Image, SpinLoading } from 'antd-mobile';
import { DataContext, WasteType, totalAll } from '@/pages';
import { useContext } from 'react';

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
        {wasteList.filter((item) => item.used === -1).length === 0 &&
        dataContext.step === 1 ? (
          <Empty description="没有待回收的垃圾了，快去运输吧🚚" />
        ) : (
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
                    高:{WasteType[item.type - 1].height} 宽:
                    {WasteType[item.type - 1].width}
                    <Image
                      src={require('@/img/' +
                        String(WasteType[item.type - 1].id) +
                        '.svg')}
                      height="80%"
                      fit="scale-down"
                      placeholder={<SpinLoading />}
                    />
                  </div>
                );
            })}
          </div>
        )}
      </div>
    </Card>
  );
}
