import './index.css';
import { Card } from 'antd';
import { DataContext } from '@/pages';
import { useContext, useEffect } from 'react';
import { WasteType } from '@/pages';

export default function ShowCase(props: any) {
  let dataContext = useContext(DataContext);
  let wasteList = dataContext.wasteList;

  return (
    <>
      <Card>
        <h2>待选择垃圾</h2>
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
      </Card>
    </>
  );
}
