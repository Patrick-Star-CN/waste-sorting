import { useContext, useEffect, useState } from 'react';
import { DataContext } from '..';
import { WasteType } from '..';
import './index.css';

function ShowCase(props: any) {
  let dataContext = useContext(DataContext);
  let wasteList = dataContext.wasteList;
  // props.toggleCurSelect(3);
  return (
    <div className="showcase">
      {wasteList.map((item, index) => {
        if (item.used === -1)
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
    if (!curSelect) {
      alert('还没有选择呢！');
      return;
    }
    let width = WasteType[wasteList[curSelect - 1].type - 1].width;
    let height = WasteType[wasteList[curSelect - 1].type - 1].height;
    let curRolMax = dataContext.storeTop[col] + height;
    let toggleStoreTop = dataContext.toggleStoreTop;
    let toggleWasteList = dataContext.toggleWasteList;
    let toggleBoxList = dataContext.toggleBoxList;

    if (width === 1) {
      if (curRolMax <= 6) {
        toggleWasteList(curSelect - 1, col * 6 + curRolMax);

        for (let i = dataContext.storeTop[col]; i < curRolMax; i++) {
          toggleBoxList(i, col, curSelect, wasteList[curSelect - 1].type);
        }
        toggleStoreTop(curRolMax, col);
      } else {
        alert('该列已经装不下了哦');
        return;
      }
    } else {
      if (curRolMax <= 6) {
        toggleWasteList(curSelect - 1, col * 6 + curRolMax);
        let newRol = rol;
        let newCol = col;
        if (newCol + width >= 4) newCol = 4 - width; // 矫正
        // console.log("max", Math.max(...dataContext.storeTop.slice(newCol, newCol + width)));
        newRol =
          Math.max(...dataContext.storeTop.slice(newCol, newCol + width)) +
          height -
          1;
        if (newRol >= 6) {
          alert('这样子好像装不下了哦');
          return;
        }
        // console.log("newRol", newRol);
        // console.log("height", height);

        for (let i = newRol; i >= newRol - height + 1; i--) {
          for (let j = newCol; j <= newCol + width - 1; j++) {
            toggleBoxList(i, j, curSelect, wasteList[curSelect - 1].type);
          }
        }
        for (let i = newCol; i <= newCol + width - 1; i++)
          toggleStoreTop(newRol + 1, i);
      } else {
        alert('该列已经装不下了哦');
        return;
      }
      // TODO:
    }
    console.log('你放置了', height, '*', width, '的垃圾');
    console.log('垃圾桶状态为', dataContext.storeTop);
    setCurSelect(0);
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
                className={box.refer !== 0 ? 'box used' : 'box'}
                key={indexCol * 4 + indexRol}
                onClick={() => place(indexCol, indexRol)}
              >
                #{indexCol * 6 + indexRol}
                <br />
                refer:{box.refer}
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
