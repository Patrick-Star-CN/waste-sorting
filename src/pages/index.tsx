import { createContext, useEffect, useState } from 'react';
import Tetris from './Tetris';
import ShowCase from './components/ShowCase';
import Bins from './components/Bins';
import Footer from './components/Footer';
import './index.css';
import { Modal, Form, Input, Button, Space, ErrorBlock } from 'antd-mobile';
import axios from 'axios';

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
};

export let WasteType: WasteType[] = [];
export let DataContext = createContext(initialData);
export let totalAll = 0;
export let record = 0;
export default function IndexPage() {
  const [form] = Form.useForm();
  useEffect(() => {
    // TODO: getData
    if (localStorage.getItem('WASTESORTING_USERNAME') === null) {
      Modal.alert({
        header: <h1>👋</h1>,
        title: '欢迎',
        content: (
          <Form form={form} mode="card">
            <Form.Item
              name="name"
              label="昵称"
              rules={[
                { required: true },
                { max: 8, message: '输入8个字符长度以下的昵称' },
              ]}
            >
              <Input placeholder="昵称最多8个字符"></Input>
            </Form.Item>
          </Form>
        ),
        onConfirm: () => {
          setUserName(form.getFieldValue('name'));
          localStorage.setItem(
            'WASTESORTING_USERNAME',
            form.getFieldValue('name'),
          );
        },
      });
    } else {
      let tmp = localStorage.getItem('WASTESORTING_USERNAME');
      if (tmp !== null) setUserName(tmp);
    }

    if (localStorage.getItem('WASTESORTING_RECORD')) {
      record = Number(localStorage.getItem('WASTESORTING_RECORD'));
      console.log(record);
    }
  }, []);

  let [score, setScore] = useState(initialScore);
  let [storeTop, setStoreTop] = useState(initialStoreTop);
  let [boxList, setBoxList] = useState(initialBoxList);
  let [step, setStep] = useState(-1); // 1 表示第一阶段，2 表示第二阶段
  let [wasteList, setWasteList] = useState(initialWasteList);
  let [curSelect, setCurSelect] = useState(0);
  let [userName, setUserName] = useState('');
  totalAll = initialWasteList.length;

  let toggleScore = () => {
    setScore((state) => state + 1);
  };
  let toggleStoreTop = (top: number, col: number) => {
    // console.log('top:', top, 'col:', col);
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
      // console.log(new_state)
      return new_state;
    });
  };

  let toggleCurSelect = (id: number) => {
    setCurSelect(id);
  };
  let toggleStep = () => {
    console.log('step', step);
    setStep((state) => 3 - state);
  };

  async function getChallenge() {
    await axios
      .get('http://localhost:8080/waste-sort/getChallenge')
      .then((response) => {
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
    await axios
      .get('http://localhost:8080/waste-sort/getDict')
      .then((response) => {
        console.log(response);
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
            toggleScore,
            toggleStoreTop,
            toggleBoxList,
            toggleWasteList,
            toggleCurSelect,
            toggleStep,
          }}
        >
          {step == 1 ? <Tetris name={userName} /> : <Bins />}
          <ShowCase />
        </DataContext.Provider>
        <Footer />
      </div>
    );
  else return <ErrorBlock fullPage />;
}
