import { useContext, useEffect, useState } from 'react';
import { DataContext } from '..';
import { WasteType } from '..';
import { Button, Space, Card } from 'antd-mobile';
import './index.css';
import { totalAll } from '..';
import { BoxList } from '..';

export default function Tetris(props: any) {
  let dataContext = useContext(DataContext);
  let wasteList = dataContext.wasteList;
  const totalToRecycle = wasteList.filter((item) => item.used === -2).length;

  useEffect(() => {
    if (totalToRecycle === totalAll) {
      alert('game over! your step number: ' + dataContext.score);
      if (
        localStorage.getItem('WASTESORTING_RECORD') &&
        Number(localStorage.getItem('WASTESORTING_RECORD')) > dataContext.score
      ) {
        localStorage.setItem('WASTESORTING_RECORD', String(dataContext.score));
      }
      window.location.reload();
    }
    return () => {
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 6; j++) dataContext.toggleBoxList(i, j, 0, 0);

      for (let i = 0; i < 4; i++) dataContext.toggleStoreTop(0, i);
      dataContext.toggleScore();
    };
  }, [totalToRecycle]);

  function place(col: number, rol: number) {
    if (!dataContext.curSelect) {
      alert('还没有选择呢！');
      return;
    }
    let width = WasteType[wasteList[dataContext.curSelect - 1].type - 1].width;
    let height =
      WasteType[wasteList[dataContext.curSelect - 1].type - 1].height;
    let curRolMax = dataContext.storeTop[col] + height;
    let toggleStoreTop = dataContext.toggleStoreTop;
    let toggleWasteList = dataContext.toggleWasteList;
    let toggleBoxList = dataContext.toggleBoxList;

    if (width === 1) {
      if (curRolMax <= 6) {
        toggleWasteList(dataContext.curSelect - 1, col * 6 + curRolMax);

        for (let i = dataContext.storeTop[col]; i < curRolMax; i++) {
          toggleBoxList(
            col,
            i,
            dataContext.curSelect,
            wasteList[dataContext.curSelect - 1].type,
          );
        }
        toggleStoreTop(curRolMax, col);
      } else {
        alert('该列已经装不下了哦');
        return;
      }
    } else {
      if (curRolMax <= 6) {
        toggleWasteList(dataContext.curSelect - 1, col * 6 + curRolMax);
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
        for (let i = newCol; i <= newCol + width - 1; i++) {
          for (let j = newRol; j >= newRol - height + 1; j--) {
            toggleBoxList(
              i,
              j,
              dataContext.curSelect,
              wasteList[dataContext.curSelect - 1].type,
            );
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
    dataContext.toggleCurSelect(0);
  }

  /*   const elem = useContext(DataContext);
    for (let i = 0; i <= 10; i++) {
      elem.toggleWasteList(1, 2);
    } */
  let boxList = dataContext.boxList;
  let toggleStep = dataContext.toggleStep;
  return (
    <Card>
      <Space block={true} justify="between">
        <h2>{props.name}的临时垃圾箱</h2>
        <Space>
          <Button
            size="small"
            onClick={() => {
              if (wasteList.filter((item) => item.used > 0).length === 0) {
                alert('放点垃圾再去运输吧');
                return;
              } else {
                toggleStep();
              }
            }}
          >
            🚚
          </Button>
          <Button size="small" color="primary">
            排行榜
          </Button>
        </Space>
      </Space>
      <div className="tetris">
        {boxList.map((boxCol, indexCol) => (
          <div className="box-col" key={indexCol}>
            {boxCol.map((box: BoxList, indexRol: number) => (
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
    </Card>
  );
}
