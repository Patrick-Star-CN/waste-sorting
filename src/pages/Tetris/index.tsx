import { useContext, useEffect, useState } from 'react';
import { DataContext } from '..';
import { WasteType } from '..';
import './index.css';

function ShowCase(props: any) {
  let wasteList = useContext(DataContext).wasteList;
  // props.toggleCurSelect(3);
  return (
    <div className="showcase">
      {wasteList.map((item, index) => {
        // let stled
        if (!item.used)
          return (
            <div
              className={
                props.curSelect === item.id
                  ? 'waste-item selected'
                  : 'waste-item'
              }
              key={index}
              onClick={() => props.toggleCurSelect(item.id)}
            >
              {item.id}
              <br />
              {item.type}
            </div>
          );
      })}
      <div className="waste-item">没有垃圾了</div>
    </div>
  );
}
export default function Tetris(props: any) {
  let dataContext = useContext(DataContext);
  let wasteList = dataContext.wasteList;
  let [curSelect, setCurSelect] = useState(0);
  function toggleCurSelect(id: number) {
    setCurSelect(id);
  }
  function place(col: number, rol: number) {
    console.log(col, rol);
    if (curSelect) {
      let width = WasteType[wasteList[curSelect - 1].type - 1].width;
      let height = WasteType[wasteList[curSelect - 1].type - 1].height;
      let curColMax = dataContext.storeTop[col] + height;
      console.log('height', height);
      let toggleStoreTop = dataContext.toggleStoreTop;
      if (curColMax <= 6) {
        toggleStoreTop(curColMax, col);
      } else return;
    }
    // if (WasteType[wasteList[curSelect - 1].type - 1].width === 1)
  }
  useEffect(() => {
    /* for (let i = 0; i < 4; i++)
      for (let j = 0; j < 6; j++)
        props.toggleBoxList(i, j, i, j) */
  }, []);
  /*   const elem = useContext(DataContext);
    for (let i = 0; i <= 10; i++) {
      elem.toggleWasteList(1, 2);
    } */
  let boxList = useContext(DataContext).boxList;
  return (
    <>
      <h2>临时垃圾箱</h2>
      <div className="tetris">
        {boxList.map((boxCol, indexCol) => (
          <div className="box-col" key={indexCol}>
            {boxCol.map((box: any[], indexRol: number) => (
              <div
                className="box"
                key={indexCol * 4 + indexRol}
                onClick={() => place(indexCol, indexRol)}
              >
                {indexCol * 4 + indexRol}
                <br />
                {box.refer}
              </div>
            ))}
          </div>
        ))}
      </div>

      <h2>待选择垃圾</h2>
      <ShowCase
        curSelect={curSelect}
        toggleCurSelect={toggleCurSelect}
      ></ShowCase>
    </>
  );
}
