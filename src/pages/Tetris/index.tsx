import { useContext, useEffect, useState } from 'react';
import { DataContext } from '..';
import { WasteType } from '..';
import {
  Button,
  Space,
  Card,
  Modal,
  Image,
  SpinLoading,
  Toast,
  Result,
} from 'antd-mobile';
import './index.css';
import { totalAll } from '..';
import { BoxList } from '..';
import Img from '../components/Img';
import Rank from '../Rank';
import axios from 'axios';

export default function Tetris(props: any) {
  let dataContext = useContext(DataContext);
  let wasteList = dataContext.wasteList;
  const totalToRecycle = wasteList.filter((item) => item.used === -2).length;

  useEffect(() => {
    if (totalToRecycle === totalAll) {
      Modal.alert({
        onConfirm: () => {
          window.location.reload();
        },
        content: (
          <Result
            status="success"
            title="今日美化任务已完成！"
            description={
              '你最终的运输次数为 ' + String(dataContext.score) + ' 次'
            }
          />
        ),
      });
      if (
        !localStorage.getItem('WASTESORTING_RECORD') ||
        Number(localStorage.getItem('WASTESORTING_RECORD')) > dataContext.score
      ) {
        localStorage.setItem('WASTESORTING_RECORD', String(dataContext.score));

        axios({
          method: 'post',
          url: 'http://localhost:8080/waste-sort/update',
          data: {
            username: props.name,
            score: String(dataContext.score),
          },
        });
      }
    }
    return () => {
      for (let i = 0; i < 4; i++)
        for (let j = 0; j < 6; j++) dataContext.toggleBoxList(i, j, 0, 0, 0);

      for (let i = 0; i < 4; i++) dataContext.toggleStoreTop(0, i);
      dataContext.toggleScore();
    };
  }, [totalToRecycle]);

  function place(col: number, rol: number) {
    if (!dataContext.curSelect) {
      Toast.show({
        content: '🚨你还没有选择呢',
        position: 'top',
        duration: 1000,
      });
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

        let index = 1;
        for (let i = dataContext.storeTop[col]; i < curRolMax; i++) {
          toggleBoxList(
            col,
            i,
            dataContext.curSelect,
            wasteList[dataContext.curSelect - 1].type,
            index++,
          );
        }
        toggleStoreTop(curRolMax, col);
      } else {
        Toast.show({
          content: '🚨该列已经装不下了',
          position: 'top',
          duration: 1000,
        });
        return;
      }
    } else {
      if (curRolMax <= 6) {
        toggleWasteList(dataContext.curSelect - 1, col * 6 + curRolMax);
        let newRol = rol;
        let newCol = col;
        if (newCol + width >= 4) newCol = 4 - width; // 矫正
        newRol =
          Math.max(...dataContext.storeTop.slice(newCol, newCol + width)) +
          height -
          1;
        if (newRol >= 6) {
          Toast.show({
            content: '🚨该列已经装不下了',
            position: 'top',
            duration: 1000,
          });
          return;
        }
        let index = 1;
        for (let i = newCol; i <= newCol + width - 1; i++) {
          for (let j = newRol - height + 1; j <= newRol; j++) {
            toggleBoxList(
              i,
              j,
              dataContext.curSelect,
              wasteList[dataContext.curSelect - 1].type,
              index++,
            );
          }
        }
        for (let i = newCol; i <= newCol + width - 1; i++)
          toggleStoreTop(newRol + 1, i);
      } else {
        Toast.show({
          content: '🚨该列已经装不下了',
          position: 'top',
          duration: 1000,
        });
        return;
      }
      // TODO:
    }
    Toast.show({
      content:
        '你放置了' +
        WasteType[wasteList[dataContext.curSelect - 1].type - 1].name,
      position: 'bottom',
      duration: 500,
    });
    dataContext.toggleCurSelect(0);
  }

  let boxList = dataContext.boxList;
  let toggleStep = dataContext.toggleStep;
  return (
    <Card>
      <Space block={true} justify="between">
        <h2>{props.name}的临时垃圾箱</h2>
        <Space>
          <Button
            color="default"
            size="small"
            onClick={() => {
              if (wasteList.filter((item) => item.used > 0).length === 0) {
                Toast.show({
                  content: '放点垃圾再去运输吧',
                  position: 'top',
                  duration: 1000,
                });
                return;
              } else {
                toggleStep();
              }
            }}
          >
            🚚
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              Modal.show({
                content: <Rank />,
                closeOnMaskClick: true,
              });
            }}
          >
            排行榜
          </Button>
        </Space>
      </Space>
      <div className="tetris">
        {boxList.map((boxCol, indexCol) => (
          <div className="box-col" key={indexCol}>
            {boxCol.map((box: BoxList, indexRol: number) => (
              <div
                className={box.refer !== 0 ? 'box' : 'box unuse'}
                key={indexCol * 4 + indexRol}
                onClick={() => place(indexCol, indexRol)}
              >
                {!box.refer ? (
                  <Image
                    src={require('@/img/border_white_20.svg')}
                    placeholder={<SpinLoading />}
                  />
                ) : (
                  <Img
                    num={WasteType[wasteList[box.refer - 1].type - 1].id}
                    pos={box.pos}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Card>
  );
}
