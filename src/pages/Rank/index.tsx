import { Card, List, Space } from 'antd-mobile';
import { record, host } from '..';
import axios from 'axios';
import { useEffect, useState } from 'react';

type Rank = {
  username: string;
  score: string;
};

export default function Rank(props: any) {
  const [rank, setRank] = useState<Rank[]>();

  useEffect(() => {
    axios.get(host + '/waste-sort/getData').then((response) => {
      setRank((state) => response.data.data);
    });
  }, []);

  return (
    <Card
      title="今日排行榜"
      extra={<span>{record ? '你的纪录 ' + record : '你今天还没玩呢'}</span>}
    >
      <List>
        <List.Item>
          <Space block justify="between">
            <h3>排名</h3>
            <h3>昵称</h3>
            <h3>运输次数</h3>
          </Space>
        </List.Item>
        {rank?.map((item, index) => (
          <List.Item key={index}>
            <Space block justify="between">
              <span>{index + 1} </span>
              <span>{item.username}</span>
              <span>{item.score}</span>
            </Space>
          </List.Item>
        ))}
      </List>
    </Card>
  );
}
