import { createContext, useEffect, useState } from 'react';
import Tetris from './Tetris';
import ShowCase from './components/ShowCase';
import Bins from './components/Bins';
import Footer from './components/Footer';
import Guide from './components/Guide';
import './index.css';
import { Modal, Form, Input, ErrorBlock, Button } from 'antd-mobile';
import axios from 'axios';

export const host = 'http://localhost:8080';
type WasteList = {
  id: number;
  type: number;
  used: number;
};

export type BoxList = {
  refer: number;
  type: number;
  pos: number;
};

type WasteType = {
  id: number;
  name: string;
  type: number;
  width: number;
  height: number;
};

const initialScore = 0;
const initialStoreTop = [0, 0, 0, 0];
const initialWasteList: WasteList[] = [];
const initialBoxList: BoxList[][] = [];
for (let i = 0; i < 4; i++) {
  let arr: BoxList[] = [];
  for (let j = 0; j < 6; j++) {
    arr.push({ refer: 0, type: 0, pos: 0 });
  }
  initialBoxList.push(arr);
}

const initialData = {
  score: 0,
  storeTop: [0, 0, 0, 0],
  boxList: initialBoxList,
  wasteList: initialWasteList,
  curSelect: 0,
  step: 0,
  promptVisible: false,
  toggleScore: () => {},
  toggleStoreTop: (top: number, col: number) => {},
  toggleBoxList: (
    rol: number,
    col: number,
    refer: number,
    type: number,
    pos: number,
  ) => {},
  toggleWasteList: (id: number, pos: number) => {},
  toggleStep: () => {},
  toggleCurSelect: (id: number) => {},
  togglePromptVisible: (state: boolean) => {},
};

export let WasteType: WasteType[] = [];
export let DataContext = createContext(initialData);
export let totalAll = 0;
export let record = 0;
export default function IndexPage() {
  let [step, setStep] = useState(-1); // 1 表示第一阶段，2 表示第二阶段
  useEffect(() => {
    if (step == 1 && localStorage.getItem('WASTESORTING_USERNAME') === null) {
      Modal.show({
        header: <h1>👋</h1>,
        title: '欢迎',
        content: (
          <Form
            mode="card"
            onFinish={(value: any) => {
              setUserName(value.name);
              localStorage.setItem('WASTESORTING_USERNAME', value.name);
              Modal.clear();
            }}
            footer={
              <Button
                block
                type="submit"
                color="primary"
                size="large"
                onClick={() => {}}
              >
                开始游戏
              </Button>
            }
          >
            <Form.Item
              name="name"
              label="昵称"
              rules={[
                { required: true },
                { min: 1, max: 8, message: '输入8个字符长度以下的昵称' },
              ]}
            >
              <Input autoComplete="off" placeholder="昵称最多8个字符"></Input>
            </Form.Item>
          </Form>
        ),
      });
    } else {
      let tmp = localStorage.getItem('WASTESORTING_USERNAME');
      if (tmp !== null) setUserName(tmp);
    }

    if (localStorage.getItem('WASTESORTING_RECORD')) {
      const recordDate = localStorage
        .getItem('WASTESORTING_RECORD')
        ?.split('&')[1];
      const todayDate = new Date().toLocaleDateString();
      if (recordDate === todayDate)
        record = Number(
          localStorage.getItem('WASTESORTING_RECORD')?.split('&')[0],
        );
      else localStorage.setItem('WASTESORTING_RECORD', '0&' + todayDate);
    }
  }, [step === 1]);

  let [score, setScore] = useState(initialScore);
  let [storeTop, setStoreTop] = useState(initialStoreTop);
  let [boxList, setBoxList] = useState(initialBoxList);
  let [wasteList, setWasteList] = useState(initialWasteList);
  let [curSelect, setCurSelect] = useState(0);
  let [userName, setUserName] = useState('');
  let [promptVisible, setPromptVisible] = useState(false);
  totalAll = initialWasteList.length;

  let toggleScore = () => {
    setScore((state) => state + 1);
  };
  let toggleStoreTop = (top: number, col: number) => {
    setStoreTop((state) => {
      let new_state = state;
      new_state[col] = top;
      return new_state;
    });
  };
  let toggleBoxList = (
    col: number,
    rol: number,
    refer: number,
    type: number,
    pos: number,
  ) => {
    setBoxList((state) => {
      let new_state = state;
      new_state[col][rol] = { refer, type, pos };
      return new_state;
    });
  };

  let toggleCurSelect = (id: number) => {
    setCurSelect(id);
  };
  let toggleStep = () => {
    setStep((state) => 3 - state);
  };
  let togglePromptVisible = (state: boolean) => {
    setPromptVisible(state);
  };
  async function getChallenge() {
    await axios.get(host + '/waste-sort/getChallenge').then((response) => {
      for (let i = 0; i < response.data.data.length; i++) {
        initialWasteList.push({
          id: i + 1,
          type: response.data.data[i].type,
          used: -1,
        });
      }
      setWasteList((state) => initialWasteList);
      setStep((state) => state + 1);
    });
  }
  async function getDict() {
    await axios.get(host + '/waste-sort/getDict').then((response) => {
      WasteType = response.data;
      setStep((state) => state + 1);
    });
  }
  useEffect(() => {
    getDict();
    getChallenge();
  }, []);

  let toggleWasteList = (num: number, pos: number) => {
    setWasteList((state) => {
      let new_state = state;
      new_state[num].used = pos;
      return new_state;
    });
  };
  if (userName && step > 0)
    return (
      <div className="index">
        <DataContext.Provider
          value={{
            score,
            storeTop,
            boxList,
            wasteList,
            curSelect,
            step,
            promptVisible,
            toggleScore,
            toggleStoreTop,
            toggleBoxList,
            toggleWasteList,
            toggleCurSelect,
            toggleStep,
            togglePromptVisible,
          }}
        >
          {step === 1 ? <Tetris name={userName} /> : <Bins />}
          <ShowCase />
        </DataContext.Provider>
        <Footer togglePromptVisible={togglePromptVisible} />
        <Guide
          visible={promptVisible}
          togglePromptVisible={togglePromptVisible}
        />
      </div>
    );
  else if (step <= 0) return <ErrorBlock status="busy" fullPage />;
  else return null;
}
